import AnalyticsHeader from "@/features/job-analytics/components/header"
import { ChartAnalytics } from "@/features/job-analytics/components/chart-analytics";
import { KeyMetrics } from "@/features/job-analytics/components/key-metrics";
import { TrafficMetrics } from "@/features/job-analytics/components/traffic-metrics";

const JobAnalytics = () => {
  return (
    <div className="space-y-8">
      <AnalyticsHeader />
      <KeyMetrics />
      <TrafficMetrics />
      <ChartAnalytics />
    </div>
  )
};

export default JobAnalytics;