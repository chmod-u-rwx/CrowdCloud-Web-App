import type { Job } from "@/types";

export function getJobStats(jobs: Job[]) {
  return {
    totalJobs: jobs.length,
    runningJobs: jobs.filter(j => j.status === "running").length,
    completedJobs: jobs.filter(j => j.status === "completed").length,
    totalCPUUsed: jobs.reduce((sum, job) => sum + job.resources.cpu, 0),
    totalRAMUsed: jobs.reduce((sum, job) => sum + job.resources.ram, 0),
  };
};