import AnalyticsHeader from "@/components/analytics/AnalyticsHeader"
import { ChartAnalytics } from "@/components/analytics/ChartAnalytics";
import { KeyMetrics } from "@/components/analytics/KeyMetrics";
import { TrafficMetrics } from "@/components/analytics/TrafficMetrics";

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