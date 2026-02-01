import type { LucideIcon } from "lucide-react";

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
}