import { api } from "@/api/axios";
import type {
  Requests,
  RequestStatus,
} from "@/types";

// --- Request Metrics API ---
export async function getResourceCostRate(): Promise<{ 
  cpu_core_cost_per_second: number;
  ram_gb_cost_per_second: number;
}>{
  const response = await api.get("/cost/");
  return response.data;
}

export async function listRequests(params?: {
  job_id?: string;
  worker_id?: string;
  status?: RequestStatus;
  start_time?: string;
  end_time?: string;
}): Promise<Requests[]> {
  const response = await api.get<Requests[]>("/requests/list-requests/", { params });
  return response.data;
}

export async function countRequests(params?: {
  job_id?: string;
  worker_id?: string;
  status?: RequestStatus;
  start_time?: string;
  end_time?: string;
}): Promise<number> {
  const response = await api.get<{ count: number }>("/requests/count", { params });
  return response.data.count;
}

export async function averageExecutionTime(params?: {
  job_id?: string;
  worker_id?: string;
  status?: RequestStatus;
  start_time?: string;
  end_time?: string;
}): Promise<number> {
  const response = await api.get<{ average_execution_time: number }>("/requests/average/execution-time", { params });
  return response.data.average_execution_time;
}

export async function averageStatusRequests(params?: {
  job_id?: string;
  worker_id?: string;
  status?: RequestStatus;
  start_time?: string;
  end_time?: string;
}): Promise<number> {
  const response = await api.get<{ average_status: number }>("/requests/average/status", { params });
  return response.data.average_status;
}