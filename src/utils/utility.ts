import type { Job, JobResources, TimePeriod } from "@/types";
import { 
  eachDayOfInterval, 
  eachMonthOfInterval, 
  eachWeekOfInterval, 
  subDays 
} from "date-fns";

export function getJobStats(jobs: Job[]) {
  return {
    totalJobs: jobs.length,
    runningJobs: jobs.filter(j => j.status === "running").length,
    completedJobs: jobs.filter(j => j.status === "completed").length,
    totalCPUUsed: jobs.reduce((sum, job) => sum + job.resources.cpu, 0),
    totalRAMUsed: jobs.reduce((sum, job) => sum + job.resources.ram, 0),
  };
};

export function getResourceCost(resources: JobResources) {
  return {
    cpuCost: resources.cpu * 0.03,
    ramCost: resources.ram * 0.05,
    totalCost: resources.cpu * 0.03 + resources.ram * 0.05,
  };
};

export function getBasicJobStats(jobs: Job[]) {
  return {
    totalJobs: jobs.length,
    runningJobs: jobs.filter(j => j.status === "running").length,
    completedJobs: jobs.filter(j => j.status === "completed").length,
    failedJobs: jobs.filter(j => j.status === "failed").length,
    pausedJobs: jobs.filter(j => j.status === "paused").length,
  };
};

export function getResourceRequests(jobs: Job[]) {
  return {
    totalCpuRequested: jobs.reduce((sum, job) => sum + job.resources.cpu, 0),
    totalRamRequested: jobs.reduce((sum, job) => sum + job.resources.ram, 0),
    activeCpuUsage: jobs
      .filter(j => j.status === "running")
      .reduce((sum, job) => sum + job.resources.cpu, 0),
    activeRamUsage: jobs
      .filter(j => j.status === "running")
      .reduce((sum, job) => sum + job.resources.ram, 0),
  };
};

// Utilities

export const getJobStatusColor = (status: Job["status"]) => {
  switch (status) {
    case "running": return "bg-blue-100 text-indigo-700 border-indigo-700";
    case "completed": return "bg-green-100 text-green-700 border-green-700 rounded";
    case "paused": return "bg-yellow-100 text-yellow-700 border-yellow-700 rounded";
    case "failed": return "bg-red-100 text-red-700 border-red-700 rounded";
    default: return "bg-secondary border-border";
  }
};

export const getRequestStatusColor = (status: "success" | "failed" | "paused" | string) => {
  switch (status) {
    case 'success': return 'text-confirm';
    case 'failed': return 'text-destructive';
    case 'paused': return 'text-pending';
    default: return 'text-gray-600';
  }
};

export const getDateRange = (period: TimePeriod) => {
  const now = new Date;

  switch(period) {
    case "daily": return { start: subDays(now, 7), intervals: eachDayOfInterval };
    case "weekly": return { start: subDays(now, 8), intervals: eachWeekOfInterval };
    case "monthly": return { start: subDays(now, 12), intervals: eachMonthOfInterval };
  }
};

export const getPeriodLabel = (period: TimePeriod) => {
  switch(period) {
    case "daily": return "Last 7 days";
    case "weekly": return "Last 8 weeks";
    case "monthly": return "Last 12 months";
  }
};