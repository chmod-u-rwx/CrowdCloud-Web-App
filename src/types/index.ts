import type { LucideIcon } from "lucide-react";

// --- Requests Shape ---
export type RequestStatus = "success" | "failed";

export type MethodEnum = "GET" | "POST" | "PUT" | "DELETE" | "RUN";

export interface JobRequestPayload {
  request_id: string;
  job_id: string;
  master_id: string;
  worker_id: string;
  method?: MethodEnum;
  path: string;
  headers?: Record<string, any>;
  params?: Record<string, any>;
  body?: any;
}

export interface JobResponsePayload {
  request_id: string;
  job_id: string;
  master_id: string;
  worker_id: string;
  status_code: number;
  body?: any;
  meta?: Record<string, any>;
  headers?: Record<string, any>;
}

export interface Requests {
  request_id: string;
  job_id: string;
  worker_id: string;
  vm_id: string;
  request_payload: JobRequestPayload;
  response_payload: JobResponsePayload;
  status?: RequestStatus;
  timestamp: string;
  execution_time: string;
  transaction_id: string;
}

//  --- Transaction Shape ---
export type TransactionStatus = "pending" | "paid" | "failed";

export interface Transaction {
  transaction_id: string;
  request_id: string;
  job_id: string;
  worker_id: string;
  timestamp: string;
  cost_ram: number;
  cost_cpu: number;
  execution_time: string;
  total_cost: number;
  status: TransactionStatus;
}

// --- Utils ---

export type TimePeriod = "daily" | "weekly" | "monthly"

export interface DashboardItem {
  title: string;
  href: string;
  icon: LucideIcon;
};

export interface NavItem {
  id: string;
  label: string;
  external?: boolean;
};

export interface AuthButton {
  label: string;
  href: string;
  variant?: "default" | "ghost" | "outline";
};

// For Request Metrics
export interface RequestMetricsParams {
  job_id?: string;
  worker_id?: string;
  status?: RequestStatus;
  start_time?: string;
  end_time?: string;
}