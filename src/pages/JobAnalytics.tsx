import AnalyticsHeader from "@/features/job-analytics/components/AnalyticsHeader"
import { ChartAnalytics } from "@/features/job-analytics/components/ChartAnalytics";
import { KeyMetrics } from "@/features/job-analytics/components/KeyMetrics";
import { TrafficMetrics } from "@/features/job-analytics/components/TrafficMetrics";

export const JobAnalytics = () => {
  return (
    <div className="space-y-8">
      <AnalyticsHeader />
      <KeyMetrics />
      <TrafficMetrics />
      <ChartAnalytics />
    </div>
  )
};