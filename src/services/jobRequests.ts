import { useQuery } from "@tanstack/react-query";
import { listRequests } from "@/services/routes/job-requests";

export function useJobRequests(params?: {
  job_id?: string;
  worker_id?: string;
  status?: "success" | "failed";
  start_time?: string;
  end_time?: string;
}) {
  return useQuery({
    queryKey: ["job-requests", params],
    queryFn: () => listRequests(params),
    enabled: !!params?.job_id,
    staleTime: 1000 * 60 * 5,
  });
}