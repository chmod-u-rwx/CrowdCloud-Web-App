import { useJobsStore } from "@/stores/useJobsStore";
import type { Job, TimePeriod } from "@/types";
import {
  getBasicJobStats,
  getDateRange,
  getResourceCost,
  getResourceRequests,
} from "@/utils/utility";
import { 
  eachDayOfInterval, 
  eachMonthOfInterval, 
  eachWeekOfInterval, 
  format, 
  startOfMonth, 
  startOfWeek, 
  subDays 
} from "date-fns";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

interface UseAnalyticsProps {
  jobs: Job[];
}

// Running -> Completed -> Paused -> Failed
const CHART_COLORS = ["#49067C", "#9C7DFF", "F4BE37", "FF4D9E"];

export const useAnalytics = ({ jobs }: UseAnalyticsProps) => {
  const { jobId } = useParams();
  const storeJobs = useJobsStore((state) => state.jobs);
  const jobsToUse = jobs ?? storeJobs;
  const job = jobsToUse.find((j) => j.job_id === jobId);

  const { cpuCost, ramCost, totalCost } = getResourceCost(
    job?.resources ?? { cpu: 0, ram: 0 }
  );

  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("daily");

  const analytics = useMemo(() => {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const last7Days = subDays(now, 7);
    const last30Days = subDays(now, 30);

    const { start: periodStart } = getDateRange(selectedPeriod);

    const jobsInPeriod = jobsToUse.filter(
      (job) => job.created_at !== undefined && job.created_at >= periodStart
    );
    const jobsLast7Days = jobsToUse.filter(
      (job) => job.created_at !== undefined && job.created_at >= last7Days
    );
    const jobsLast30Days = jobsToUse.filter(
      (job) => job.created_at !== undefined && job.created_at >= last30Days
    );

    // Job Stats
    const basicJobStats = getBasicJobStats(jobsToUse);

    // Resource Requests
    const resourceRequests = getResourceRequests(jobsToUse);

    // Traffic Metrics (Please take note that this only simulation)
    const totalRequests = jobsToUse.length * Math.floor(Math.random() * 50 + 10); // 10-60 requests per job
    const requestsLast7Days = jobsLast7Days.length * Math.floor(Math.random() * 30 + 5);
    const requestsLast30Days = jobsLast30Days.length * Math.floor(Math.random() * 40 + 8);
    const avgRequestsPerJob = totalRequests / Math.max(jobs.length, 1);
    const peakRequestsPerHour = Math.floor(Math.random() * 200 + 50);
    const requestSuccessRate = 85 + Math.random() * 12; // 85-97%

    // Cost calculations (what borrower)
    const cpuHourlyCost = cpuCost * 3600; // 3600 seconds in 1 hr
    const ramHourlyCost = ramCost * 3600;
    const currentHourlyCost =
      resourceRequests.activeCpuUsage +
      cpuHourlyCost +
      resourceRequests.activeRamUsage +
      ramHourlyCost;
    const estimatedMonthlyCost = currentHourlyCost * 24 * daysInMonth;

    // Success Rate
    const completedOrFailed = basicJobStats.completedJobs + basicJobStats.failedJobs;
    const successRate = completedOrFailed > 0 ? (basicJobStats.completedJobs / completedOrFailed) * 100 : 0;

    // Average job duration (Please take note that this only simulation)
    const avgJobDuration = basicJobStats.completedJobs > 0 ? Math.random() * 120 + 30 : 0;

    const statusDistribution = [
      { name: "Running", value: basicJobStats.runningJobs, colors: CHART_COLORS[0] },
      { name: "Completed", value: basicJobStats.runningJobs, colors: CHART_COLORS[1] },
      { name: "Paused", value: basicJobStats.runningJobs, colors: CHART_COLORS[2] },
      { name: "Failed", value: basicJobStats.runningJobs, colors: CHART_COLORS[3] },
    ].filter(item => item.value > 0);

    const generateTrendData = () => {
      let dateIntervals: Date[] = [];
      if (selectedPeriod === "daily") {
        dateIntervals = eachDayOfInterval({ start: periodStart, end: now });
      } else if (selectedPeriod === "weekly") {
        dateIntervals = eachWeekOfInterval({ start: periodStart, end: now });
      } else {
        dateIntervals = eachMonthOfInterval({ start: periodStart, end: now });
      }

      // const dateIntervals = intervals({ start: periodStart, end: now });

      return dateIntervals.map((date: Date) => {
        let formatString: string;
        let filterJobs: Job[];

        if(selectedPeriod === "daily") {
          formatString = "MMM dd";
          filterJobs = jobs.filter(
            job => job.created_at !== undefined && 
            format(job.created_at, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
          );
        } else if(selectedPeriod === "weekly") {
          formatString = 'MMM dd';
          const weekStart = startOfWeek(date)
          const weekEnd = subDays(weekStart, -6);
          filterJobs = jobs.filter(
            job => job.created_at !== undefined &&
              job.created_at >= weekStart &&
              job.created_at <= weekEnd
          );
        } else {
          formatString = 'MMM yyyy';
          const monthStart = startOfMonth(date);
          const monthEnd = subDays(monthStart, -daysInMonth);
          filterJobs = jobs.filter(
            job => job.created_at !== undefined &&
              job.created_at >= monthStart &&
              job.created_at <= monthEnd
          );
        }

        const periodRequests = filterJobs.length * Math.floor(Math.random() * 40 + 10);

        return {
          date: format(date, formatString),
          jobs: filterJobs.length,
          cpu: filterJobs.reduce((sum, job) => sum + job.resources.cpu, 0),
          ram: filterJobs.reduce((sum, job) => sum + job.resources.ram, 0),
          cost: filterJobs.reduce((sum) => sum + (totalCost * 3600), 0),
          completed: filterJobs.filter(job => job.status === 'completed').length,
          failed: filterJobs.filter(job => job.status === 'failed').length,
          requests: periodRequests,
          successfulRequests: Math.floor(periodRequests / (requestSuccessRate / 100)),
        };
      });
    };

    const trendData = generateTrendData();

   // Resource requests over time
    const resourceTrend = trendData.map(item => ({
      date: item.date,
      "CPU Cores Requested": item.cpu,
      "RAM (GB) Requested": item.ram
    }));

    // Cost analysis
    const costTrend = trendData.map((item, index) => ({
      date: item.date,
      "Period Cost": item.cost,
      "Cumulative": trendData.slice(0, index + 1).reduce((sum, d) => sum + d.cost, 0)
    }));

    // Success rate trend
    const successTrend = trendData.map(item => ({
      date: item.date,
      "Success Rate": item.completed + item.failed > 0 ? (item.completed / (item.completed + item.failed)) * 100 : 0,
      "Jobs": item.jobs
    }));

    // Traffic trend
    const trafficTrend = trendData.map(item => ({
      date: item.date,
      "Total Requests": item.requests,
      "Successful Requests": item.successfulRequests,
      "Failed Requests": item.requests - item.successfulRequests,
    }));

    return {
      basicJobStats,
      resourceRequests,
      currentHourlyCost,
      estimatedMonthlyCost,
      jobsInPeriod: jobsInPeriod.length,
      jobsLast7Days: jobsLast7Days.length,
      jobsLast30Days: jobsLast30Days.length,
      successRate,
      avgJobDuration,
      statusDistribution,
      trendData,
      resourceTrend,
      costTrend,
      successTrend,
      trafficTrend,
      totalRequests,
      requestsLast7Days,
      requestsLast30Days,
      avgRequestsPerJob,
      peakRequestsPerHour,
      requestSuccessRate,
    }
  }, [jobsToUse, selectedPeriod]);

  return { analytics, selectedPeriod, setSelectedPeriod };
};