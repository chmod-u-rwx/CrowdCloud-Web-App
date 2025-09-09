import type { LucideIcon } from "lucide-react";

// --- Job Shape ---

export type JobStatus = "pending" | "running" | "completed" | "failed";

export interface JobResources {
  cpu: number;
  ram: number;
}

export interface Job {
  user_id: string;
  job_id: string;
  job_name: string;
  repo_url: string;
  job_description: string;
  resources: JobResources;
  status: JobStatus;
  created_at?: string;
  updated_at?: string;
};

export interface JobCreate {
  user_id: string;
  job_name: string;
  repo_url: string;
  job_description: string;
  resources: JobResources;
};

export interface JobUpdate {
  job_name?: string;
  job_description?: string;
  repo_url?: string;
  resources?: JobResources;
  status?: JobStatus;
}

// --- User Shape ---

export type UserRole = "individual" | "company";

export interface User {
  user_id: string; //UUID as string
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  role: UserRole;
  company_name?: string;
  company_address?: string;
}

export interface UserCreate {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  role: UserRole;
  password: string;
  confirm_password: string;
  company_name?: string;
  company_address?: string;
}

export interface UserAuth {
  access_token: string;
  token_type: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  user_id: string;
  role: UserRole;
  companyName?: string;
  companyAddress?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UserUpdate {
  first_name?: string;
  last_name?: string;
  username?: string;
  email?: string;
  password?: string;
}

// --- Utils ---

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

export interface AuthButton {
  label: string;
  href: string;
  variant?: "default" | "ghost" | "outline";
};