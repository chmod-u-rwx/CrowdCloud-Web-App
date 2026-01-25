import { api } from "@/api/axios";
import type {
  Job,
  JobCreate,
  JobUpdate,
  Requests,
  RequestStatus,
} from "@/types";

// --- Job API ---
export async function createJob(data: JobCreate): Promise<Job> {
  try {
    const response = await api.post<Job>("/job/create", data);
    return response.data;
  } catch (err: any) {
    console.error("POST /job/create failed:", err?.response?.data || err);
    throw err;
  }
}

export async function getJob(job_id: string): Promise<Job> {
  const response = await api.get<Job>(`/job/get/${job_id}`);
  return response.data;
}

// List jobs (optionally by user_id, with pagination)
export async function listJobs(params?: {
  user_id?: string;
  skip?: number;
  limit?: number;
  newest_first?: boolean;
}): Promise<Job[]> {
  const response = await api.get<Job[]>("/job/list", { params });
  return response.data;
}

export async function updateJob(job_id: string, data: JobUpdate): Promise<Job> {
  const response = await api.put<Job>(`/job/update/${job_id}`, data);
  return response.data;
}

export async function deleteJob(job_id: string): Promise<void> {
  await api.delete(`/job/delete/${job_id}`);
}

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