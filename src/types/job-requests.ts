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