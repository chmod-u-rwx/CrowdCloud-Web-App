import { useAnalytics } from "@/hooks/useAnalytics";
import { useJobsStore } from "@/stores/useJobsStore";
import { StatsCard } from "@/features/job-analytics/components/StatsCard";
import { BriefcaseBusiness, Globe, MemoryStick, Zap } from "lucide-react";

export const TrafficMetrics = () => {
  const jobs = useJobsStore((state) => state.jobs);
  const { analytics } = useAnalytics({ jobs });
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Avg Requests/Job"
        value={analytics.avgRequestsPerJob.toFixed(0)}
        subtitle="Per job average"
        icon={Globe}
      />

      <StatsCard
        title="Active Jobs"
        value={analytics.basicJobStats.runningJobs}
        subtitle="Currently running"
        icon={Zap}
      />

      <StatsCard
        title="Active RAM Requests"
        value={`${analytics.resourceRequests.activeRamUsage} GB`}
        subtitle={`of ${analytics.resourceRequests.totalRamRequested} GB requested`}
        icon={MemoryStick}
      />

      <StatsCard
        title="Job Success Rate"
        value={analytics.avgRequestsPerJob.toFixed(0)}
        subtitle="Per job average"
        icon={BriefcaseBusiness}
      />
    </div>
  )
};