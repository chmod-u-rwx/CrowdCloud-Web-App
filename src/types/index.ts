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
};

export interface DashboardItem {
  title: string;
  href: string;
  icon: LucideIcon;
};

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
};

export interface UserAuth {
  accessToken: string;
  tokenType: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  userId: string;
  role: "individual" | "company";
  companyName?: string;
  companyAddress?: string;
}

export interface IndividualUserCredentials {
  userId?: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  role: "individual";
};

export interface CompanyUserCredentials {
  userId?: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  companyAddress: string;
  password: string;
  confirmPassword: string;
  role: "company";
};

export interface LoginCredentials {
  email: string;
  password: string;
}