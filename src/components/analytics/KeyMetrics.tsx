import { StatsCard } from "@/components/analytics/StatsCard";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useJobsStore } from "@/stores/useJobsStore";
import { Cpu, PhilippinePeso, Send, Target } from "lucide-react";

export const KeyMetrics = () => {
  const jobs = useJobsStore((state) => state.jobs);
  const { analytics } = useAnalytics({ jobs });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Total Requests"
        value={analytics.totalRequests.toLocaleString()}
        subtitle="All Time"
        icon={Send}
        trend={analytics.requestsLast7Days > 0 ? "up" : "neutral"}
        trendValue={`${analytics.requestsLast7Days.toLocaleString()} this week`}
      />

      <StatsCard
        title="Request Success Rate"
        value={`${analytics.requestSuccessRate.toFixed(1)}%`}
        subtitle="Successful requests"
        icon={Target}
        trend={
          analytics.requestSuccessRate >= 90
            ? "up"
            : analytics.requestSuccessRate >= 80
            ? "neutral"
            : "down"
        }
        trendValue={`${analytics.peakRequestsPerHour}/hour peak`}
        color="green"
      />

      <StatsCard
        title="Active CPU Requests"
        value={analytics.resourceRequests.activeCpuUsage}
        subtitle={`of ${analytics.resourceRequests.totalCpuRequested} requested`}
        icon={Cpu}
        trend="neutral"
        trendValue={`${(
          (analytics.resourceRequests.activeCpuUsage /
            Math.max(analytics.resourceRequests.activeCpuUsage, 1)) *
          100
        ).toFixed(0)}% active`}
      />

      <StatsCard
        title="Monthly Cost"
        value={`₱${analytics.estimatedMonthlyCost.toFixed(2)}`}
        subtitle="Current rate"
        icon={PhilippinePeso}
        trend="neutral"
        trendValue={`${analytics.currentHourlyCost.toFixed(2)}/hour`}
      />
    </div>
  );
};