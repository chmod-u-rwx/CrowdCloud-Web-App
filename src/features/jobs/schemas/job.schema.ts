export type JobStatus = "paused" | "running" | "completed" | "failed";

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
  started_at?: string,
  ended_at?: string;
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