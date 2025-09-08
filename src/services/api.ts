import { api } from "@/api/axios";
import type {
  Job,
  JobCreate,
  JobUpdate,
  LoginCredentials,
  User,
  UserAuth,
  UserCreate
} from "@/types";

export async function signupUser(data: UserCreate): Promise<User> {
  const response = await api.post<User>("/users/signup", data);
  return response.data;
}

export async function loginUser(data: LoginCredentials): Promise<UserAuth> {
  const response = await api.post<UserAuth>("/users/login", data);
  return response.data;
}

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