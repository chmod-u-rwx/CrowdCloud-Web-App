import { api } from "@/api/axios";
import type { Job, JobCreate, JobUpdate } from "@/types/jobs";
import { toast } from "sonner";

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
    toast.error(err?.response?.data?.detail || "Failed to get user's jobs.");
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
  try {
    const response = await api.get<Job[]>("/job/list", { params });
    return response.data;
  } catch (error: any) {
    console.error("GET /job/list failed.", error);
    toast.error("Failed to list users job.");
    throw error
  }
}

export async function updateJob(job_id: string, data: JobUpdate): Promise<Job> {
  try {
    const response = await api.put<Job>(`/job/update/${job_id}`, data);
    return response.data;
  } catch (error) {
    toast.error("Failed to update jobs.");
    throw error;
  }
}

export async function deleteJob(job_id: string): Promise<void> {
  try {
    await api.delete(`/job/delete/${job_id}`);
  } catch (error) {
    toast.error("Failed to delete job.");
  }
}