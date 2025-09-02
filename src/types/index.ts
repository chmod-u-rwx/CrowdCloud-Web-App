import type { LucideIcon } from "lucide-react";

export interface Job {
  jobId: string;
  jobName: string;
  jobUrl: string;
  jobDescription: string;
  resources: {
    cpu: number;
    ram: number;
  };
  status: "pending" | "running" | "completed" | "failed";
  createdAt: Date;
};

export interface CreateJobRequest {
  jobId: string;
  jobName: string;
  jobUrl: string;
  jobDescription: string;
  resources: {
    cpu: number;
    ram: number;
  };
}

export interface DashboardItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}