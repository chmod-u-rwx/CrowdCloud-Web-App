import { useAnalyticsStore } from "@/stores/useAnalyticsStore";
import { useJobsStore } from "@/stores/useJobsStore";
import { useRequestMetrics } from "@/hooks/useRequestMetrics";
import type { Job, Requests, } from "@/types";
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
  endOfMonth, 
  endOfWeek, 
  format, 
  startOfMonth, 
  startOfWeek, 
  subDays 
} from "date-fns";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

interface UseAnalyticsProps {
  jobs: Job[];
}

// Running -> Completed -> Paused -> Failed
const CHART_COLORS = ["#49067C", "#9C7DFF", "#F4BE37", "#FF4D9E"];

export const useAnalytics = ({ jobs }: UseAnalyticsProps) => {
  const { jobId } = useParams();
  const selectedPeriod = useAnalyticsStore((state) => state.selectedPeriod);
  const costRates = useAnalyticsStore((state) => state.costRates);

  const { start, end } = getDateRange(selectedPeriod);
  
  const { requests } = useRequestMetrics(
    jobId
      ? {
          job_id: jobId,
          start_time: start.toISOString(),
          end_time: end.toISOString(),
        }
      : undefined
  );
  
  const storeJobs = useJobsStore((state) => state.jobs);
  const jobsToUse = jobs ?? storeJobs;
  const job = jobsToUse.find((j) => j.job_id === jobId);

  const rates = costRates ?? {
    cpu_core_cost_per_second: 0.03,
    ram_gb_cost_per_second: 0.05,
  }

  const { cpuCost, ramCost } = getResourceCost(
    job?.resources ?? { cpu: 0, ram: 0 },
    rates,
  );

  const analytics = useMemo(() => {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const last7Days = subDays(now, 7);
    const last30Days = subDays(now, daysInMonth);

    const jobsInPeriod = jobsToUse.filter(
      (job) => job.created_at !== undefined && new Date(job.created_at) >= start
    );
    const jobsLast7Days = jobsToUse.filter(
      (job) => job.created_at !== undefined && new Date(job.created_at) >= last7Days
    );
    const jobsLast30Days = jobsToUse.filter(
      (job) => job.created_at !== undefined && new Date(job.created_at) >= last30Days
    );

    // Job Stats
    const basicJobStats = getBasicJobStats(jobsToUse);

    // Resource Requests
    const resourceRequests = getResourceRequests(jobsToUse);

    const totalRequests = requests.length;
    const requestsLast7Days = requests.filter(
      req => new Date(req.timestamp) >= last7Days
    ).length;
    const requestsLast30Days = requests.filter(
      req => new Date(req.timestamp) >= last30Days
    ).length;
    const avgRequestsPerJob = jobs.length > 0 ? totalRequests / jobs.length : 0;
    const peakRequestsPerHour = Math.max(
      ...Object.values(
        requests.reduce((acc, req) => {
          const hour = new Date(req.timestamp).getHours();
          acc[hour] = (acc[hour] || 0) + 1;

          return acc;
        }, {} as Record<number, number>)
      )
    );
    const successfulRequests = requests.filter(req => req.status === "success").length;
    const requestSuccessRate = totalRequests > 0 ? (successfulRequests / totalRequests) * 100 : 0;

    // Cost calculations
    const cpuHourlyCost = cpuCost * 3600; // 3600 seconds in 1 hr
    const cpuMonthlyCost = resourceRequests.activeCpuUsage * 24 * daysInMonth;

    const ramHourlyCost = ramCost * 3600;
    const ramMonthlyCost = resourceRequests.activeRamUsage * 24 * daysInMonth;
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
      { name: "Completed", value: basicJobStats.completedJobs, colors: CHART_COLORS[1] },
      { name: "Paused", value: basicJobStats.pausedJobs, colors: CHART_COLORS[2] },
      { name: "Failed", value: basicJobStats.failedJobs, colors: CHART_COLORS[3] },
    ].filter(item => item.value > 0);

    const generateTrendData = () => {
      let dateIntervals: Date[] = [];
      if (selectedPeriod === "daily") {
        dateIntervals = eachDayOfInterval({ start, end: now });
      } else if (selectedPeriod === "weekly") {
        dateIntervals = eachWeekOfInterval({ start, end: now });
      } else {
        dateIntervals = eachMonthOfInterval({ start, end: now });
      }

      // const dateIntervals = intervals({ start: periodStart, end: now });

      return dateIntervals.map((date: Date) => {
        let formatString: string;
        let periodRequests: Requests[];

        if(selectedPeriod === "daily") {
          formatString = "MMM dd";
          periodRequests = requests.filter(
            req => format(new Date(req.timestamp), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
          );
        } else if(selectedPeriod === "weekly") {
          formatString = 'MMM dd';
          const weekStart = startOfWeek(date)
          const weekEnd = endOfWeek(date);
          periodRequests = requests.filter(
            req => {
              const ts = new Date(req.timestamp);
              return ts >= weekStart && ts <= weekEnd;
            }
          );
        } else {
          formatString = 'MMM yyyy';
          const monthStart = startOfMonth(date);
          const monthEnd = endOfMonth(date);
          periodRequests = requests.filter(
            req => {
              const ts = new Date(req.timestamp);
              return ts >= monthStart && ts <= monthEnd;
            }
          );
        }

        const jobsInPeriod = jobsToUse.filter(
          job => job.created_at !== undefined && (
            selectedPeriod === "daily"
            ? format(job.created_at, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
            : selectedPeriod === "weekly"
              ? new Date(job.created_at) >= startOfWeek(date) && new Date(job.created_at) <= endOfWeek(date)
              : new Date(job.created_at) >= startOfMonth(date) && new Date(job.created_at) <= endOfMonth(date)
          )
        );

        const completed = periodRequests.filter(req => req.status === "success").length;
        const failed = periodRequests.filter(req => req.status === "failed").length;

        const runningJobsInPeriod = jobsInPeriod.filter(job => job.status === "running");

        return {
          date: format(date, formatString),
          jobs: jobsInPeriod.length,
          cpu: jobsInPeriod.reduce((sum, job) => sum + job.resources.cpu, 0),
          ram: jobsInPeriod.reduce((sum, job) => sum + job.resources.ram, 0),

          cost: runningJobsInPeriod.reduce((sum, job) => {
            const { cpuCost, ramCost } = getResourceCost(job.resources, rates);
            return sum + ((cpuCost + ramCost) * 3600);
          }, 0),
          completed,
          failed,
          requests: periodRequests.length,
          successfulRequests: completed,
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
      cpuMonthlyCost,
      ramMonthlyCost,
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
  }, [jobsToUse, selectedPeriod, requests]);

  return { 
    analytics,
    selectedPeriod,
  };
};