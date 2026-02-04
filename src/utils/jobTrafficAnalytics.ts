import type { Requests } from "@/types/job-requests";
import { format, subHours } from "date-fns";

export function getHourlyRequestVolume(
  requests: Requests[]
): Array<{ 
    time: string;
    successfulRequest: number;
    failedRequest: number 
}> {
  const now = new Date();
  return Array.from({ length: 24 }, (_, i) => {
    const hourStart = subHours(now, 23 - i);
    const hourEnd = subHours(now, 22 - i);
    const hourLabel = format(hourStart, "HH:00");
    const requestsInHour = requests.filter(r => {
      const ts = new Date(r.timestamp);
      return ts >= hourStart && ts < hourEnd;
    });
    return {
      time: hourLabel,
      successfulRequest: requestsInHour.filter(
        r => r.status === "success"
      ).length,
      failedRequest: requestsInHour.filter(
        r => r.status === "failed"
      ).length,
    };
  });
}

export function getHourlyResponseTime(requests: Requests[]): Array<{ time: string; avgResponseTime: number }> {
  const now = new Date();
  return Array.from({ length: 24 }, (_, i) => {
    const hourStart = subHours(now, 23 - i);
    const hourEnd = subHours(now, 22 - i);
    const hourLabel = format(hourStart, "HH:00");
    const requestsInHour = requests.filter(r => {
      const ts = new Date(r.timestamp);
      return ts >= hourStart && ts < hourEnd;
    });
    const avgResponseTime = requestsInHour.length > 0
      ? requestsInHour.reduce(
          (sum, r) => sum + (
            typeof r.execution_time === "number" 
            ? r.execution_time 
            : Number(r.execution_time) || 0
          ), 0
        ) / requestsInHour.length
      : 0;
    return {
      time: hourLabel,
      avgResponseTime,
    };
  });
}