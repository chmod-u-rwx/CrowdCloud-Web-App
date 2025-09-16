import { listRequests } from "@/services/api";
import { useAnalyticsStore } from "@/stores/useAnalyticsStore";
import type { RequestMetricsParams } from "@/types";
import { useEffect, useMemo } from "react";

export const useRequestMetrics = (
  params?: RequestMetricsParams
) => {
  const {
    requests,
    setRequests,
    loading,
    setLoading
  } = useAnalyticsStore();

  const memoizedParams = useMemo(() => params, [
    params?.job_id,
    params?.start_time,
    params?.end_time,
    params?.status,
    params?.worker_id
  ]);

  useEffect(() => {
    setLoading(true);

    listRequests(memoizedParams)
      .then(setRequests)
      .finally(() => setLoading(false));
  }, [memoizedParams, setRequests, setLoading]);

  return { requests, loading };
};