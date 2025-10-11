import type { Job, JobResources, TimePeriod } from "@/types";
import {
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
  subDays,
} from "date-fns";
import { 
  Brain,
  CheckCircle,
  Coins,
  Cpu,
  Monitor,
  Network,
  Shield,
  Zap
} from "lucide-react";

export function getJobStats(jobs: Job[]) {
  return {
    totalJobs: jobs.length,
    runningJobs: jobs.filter((j) => j.status === "running").length,
    completedJobs: jobs.filter((j) => j.status === "completed").length,
    totalCPUUsed: jobs.reduce((sum, job) => sum + job.resources.cpu, 0),
    totalRAMUsed: jobs.reduce((sum, job) => sum + job.resources.ram, 0),
  };
}

export function getResourceCost(
  resources: JobResources,
  rates: {
    cpu_core_cost_per_second: number;
    ram_gb_cost_per_second: number;
  }
) {
  return {
    cpuCost: resources.cpu * rates.cpu_core_cost_per_second,
    ramCost: resources.ram * rates.ram_gb_cost_per_second,
    totalCost:
      resources.cpu * rates.cpu_core_cost_per_second +
      resources.ram * rates.ram_gb_cost_per_second,
  };
}

export function getBasicJobStats(jobs: Job[]) {
  return {
    totalJobs: jobs.length,
    runningJobs: jobs.filter((j) => j.status === "running").length,
    completedJobs: jobs.filter((j) => j.status === "completed").length,
    failedJobs: jobs.filter((j) => j.status === "failed").length,
    pausedJobs: jobs.filter((j) => j.status === "paused").length,
  };
}

export function getResourceRequests(jobs: Job[]) {
  return {
    totalCpuRequested: jobs.reduce((sum, job) => sum + job.resources.cpu, 0),
    totalRamRequested: jobs.reduce((sum, job) => sum + job.resources.ram, 0),
    activeCpuUsage: jobs
      .filter((j) => j.status === "running")
      .reduce((sum, job) => sum + job.resources.cpu, 0),
    activeRamUsage: jobs
      .filter((j) => j.status === "running")
      .reduce((sum, job) => sum + job.resources.ram, 0),
  };
}

// Utilities

export const getJobStatusColor = (status: Job["status"]) => {
  switch (status) {
    case "running":
      return "bg-blue-100 text-indigo-700 border-indigo-700";
    case "completed":
      return "bg-green-100 text-green-700 border-green-700 rounded";
    case "paused":
      return "bg-yellow-100 text-yellow-700 border-yellow-700 rounded";
    case "failed":
      return "bg-red-100 text-red-700 border-red-700 rounded";
    default:
      return "bg-secondary border-border";
  }
};

export const getRequestStatusColor = (
  status: "success" | "failed" | "paused" | string
) => {
  switch (status) {
    case "success":
      return "text-confirm";
    case "failed":
      return "text-destructive";
    case "paused":
      return "text-pending";
    default:
      return "text-gray-600";
  }
};

export const getDateRange = (period: TimePeriod) => {
  const now = new Date();

  switch (period) {
    case "daily":
      return {
        start: subDays(now, 7),
        end: now,
      };

    case "weekly":
      return {
        start: startOfWeek(subDays(now, 20)),
        end: endOfWeek(now),
      };

    case "monthly":
      return {
        start: startOfMonth(subDays(now, 365)),
        end: endOfMonth(now),
      };
  }
};

export const getPeriodLabel = (period: TimePeriod) => {
  switch (period) {
    case "daily":
      return "Last 7 days";
    case "weekly":
      return "Last 4 weeks";
    case "monthly":
      return "Last 12 months";
  }
};

// --- Landing Page ---

export const getFeatures = [
  {
    icon: Cpu,
    title: "Distributed Serverless Compute",
    description:
      "Execute sandboxed workloads across peer-contributed nodes with lightweight virtualization and automatic scaling.",
    gradient: "from-accent to-primary-three",
  },
  {
    icon: Brain,
    title: "AI-Powered Scheduling",
    description:
      "Intelligent job distribution based on real-time availability, workload characteristics, and predictive models.",
    gradient: "from-accent to-primary-three",
  },
  {
    icon: Network,
    title: "Redundant Storage Layer",
    description:
      "Distributed object and blob storage with built-in replication and automatic failover mechanisms.",
    gradient: "from-accent to-primary-three",
  },
  {
    icon: Shield,
    title: "Secure Sandboxing",
    description:
      "Military-grade isolation using Firecracker virtualization ensures complete security between workloads.",
    gradient: "from-accent to-primary-three",
  },
  {
    icon: Coins,
    title: "Transparent Incentives",
    description:
      "Fair compensation system with automated metering and token-based rewards for contributing nodes.",
    gradient: "from-accent to-primary-three",
  },
  {
    icon: Zap,
    title: "Warm Start Optimization",
    description:
      "Environment caching and intelligent pre-warming reduce cold-start latency for frequent workloads.",
    gradient: "from-accent to-primary-three",
  },
];

export const getObjectives = [
  "Design distributed system for secure, sandboxed serverless compute jobs",
  "Create redundant storage system with built-in failover mechanisms",
  "Develop AI-based scheduler for dynamic workload distribution",
  "Implement transparent incentive model with automated compensation",
  "Evaluate scalability, security, and efficiency with real-world benchmarks",
];

export const getScopeFeatures = [
  "Peer-contributed compute infrastructure with sandboxed execution",
  "Distributed blob and object storage with replication",
  "AI-powered scheduler with predictive models",
  "Environment caching and warm start optimization",
  "Web-based developer interface for job submissions",
  "Desktop contributor interface with resource limit controls",
];

export const getLimitations = [
  "CPU-based workloads only (no GPU/TPU support in this phase)",
  "Local credit system instead of public blockchain integration",
  "Fixed-rate incentive system for prototype phase",
  "Desktop and server-class contributors only (no mobile optimization)",
];

export const appFeatures = [
  { icon: Shield, text: "Secure resource sharing with full control" },
  { icon: Zap, text: "Real-time earnings tracking and analytics" },
  { icon: Monitor, text: "Set custom resource limits and schedules" },
  { icon: CheckCircle, text: "Automatic updates and maintenance" }
];
