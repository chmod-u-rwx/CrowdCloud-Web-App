import { api } from "@/api/axios";
import type { Job, JobCreate, JobUpdate } from "@/types/jobs";

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
  try {
    const response = await api.get<Job>(`/job/get/${job_id}`);
    return response.data;
  } catch (err: any) {
    console.error(`GET /job/get/${job_id} failed to fetch:`, err?.response?.data || err);
    throw err;
  }
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