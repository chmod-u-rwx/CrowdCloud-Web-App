import type { Job } from "@/types";
import { format, subHours } from "date-fns";
import { useMemo } from "react";

export default function useMockLogs(job: Job | undefined) {
  // Generate mock traffic data
  const mockTrafficData = useMemo(() => {
    if (!job) return [];

    const now = new Date();
    const hours = Array.from({ length: 24 }, (_, i) => subHours(now, 23 - i));

    return hours.map((hour) => ({
      time: format(hour, "HH:mm"),
      requests: Math.floor(Math.random() * 50 + 10),
      successfulRequest: Math.floor(Math.random() * 45 + 8),
      failedRequest: Math.floor(Math.random() * 5 + 1),
      avgResponseTime: Math.floor(Math.random() * 200 + 50),
    }));
  }, [job]);

  // Generate mock request logs
  const mockRequestLogs = useMemo(() => {
    if (!job) return [];

    const requests = [];
    const now = new Date();

    for (let i = 0; i < 50; i++) {
      const timestamp = subHours(now, Math.random() * 24);
      const isSuccess = Math.random() > 0.15;

      requests.push({
        id: `req-${i}`,
        timestamp,
        method: ["GET", "POST", "PUT", "DELETE"][Math.floor(Math.random() * 4)],
        endpoint: ["/api/compute", "/api/status", "/api/logs", "/api/metrics"][
          Math.floor(Math.random() * 4)
        ],
        status: isSuccess ? "success" : "failed",
        responseTime: Math.floor(Math.random() * 300 + 50),
        statusCode: isSuccess
          ? 200
          : [400, 404, 500, 503][Math.floor(Math.random() * 4)],
        errorMessage: !isSuccess
          ? [
              "Connection timeout",
              "Resource unavailable",
              "Invalid request",
              "Server error",
            ][Math.floor(Math.random() * 4)]
          : undefined,
      });
    }

    return requests.sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    );
  }, [job]);

  const mockErrorLogs = useMemo(() => {
    if (!job) return [];

    const getErrorMessage = (
      type: "runtime" | "network" | "resource" | "timeout"
    ) => {
      const messages: {
        runtime: string[];
        network: string[];
        resource: string[];
        timeout: string[];
      } = {
        runtime: [
          "Null pointer exception",
          "Memory allocation failed",
          "Stack overflow detected",
          "Invalid operation",
        ],
        network: [
          "Connection refused",
          "DNS resolution failed",
          "Network timeout",
          "SSL handshake failed",
        ],
        resource: [
          "Insufficient memory",
          "CPU limit exceeded",
          "Disk space full",
          "Resource quota exceeded",
        ],
        timeout: [
          "Request timeout",
          "Job execution timeout",
          "Connection timeout",
          "Response timeout",
        ],
      };

      const typeMessages = messages[type];
      return typeMessages[Math.floor(Math.random() * typeMessages.length)];
    };

    const errors = [];
    const now = new Date();

    for (let i = 0; i < 15; i++) {
      const timestamp = subHours(now, Math.random() * 48);
      const errorTypes = ["runtime", "network", "resource", "timeout"] as const;
      const severities = ["low", "medium", "high", "critical"];
      const errorType: "runtime" | "network" | "resource" | "timeout" =
        errorTypes[Math.floor(Math.random() * errorTypes.length)];

      errors.push({
        id: `err-${i}`,
        timestamp,
        errorCode: `E${Math.floor(Math.random() * 9000 + 1000)}`,
        errorType,
        message: getErrorMessage(errorType),
        stack:
          Math.random() > 0.5
            ? `at Function.${errorType}Error (job.js:${Math.floor(
                Math.random() * 100 + 1
              )}:${Math.floor(Math.random() * 50 + 1)})`
            : undefined,
        severity: severities[Math.floor(Math.random() * severities.length)],
      });
    }

    return errors.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }, [job]);

  return { mockTrafficData, mockRequestLogs, mockErrorLogs };
}