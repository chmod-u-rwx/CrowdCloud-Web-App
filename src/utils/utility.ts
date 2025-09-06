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

export const getJobStatusColor = (status: Job["status"]) => {
  switch (status) {
    case "running": return "bg-blue-100 text-indigo-700 border-indigo-700";
    case "completed": return "bg-green-100 text-green-700 border-green-700 rounded";
    case "pending": return "bg-yellow-100 text-yellow-700 border-yellow-700 rounded";
    case "failed": return "bg-red-100 text-red-700 border-red-700 rounded";
    default: return "bg-secondary border-border";
  }
};