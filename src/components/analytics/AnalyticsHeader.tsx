import { BarChart3, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { TimePeriod } from "@/types";
import { Button } from "@/components/ui/button";
// import { useJobsStore } from "@/stores/useJobsStore";
import { useAnalyticsStore } from "@/stores/useAnalyticsStore";

export default function AnalyticsHeader() {
  const { selectedPeriod, setSelectedPeriod } = useAnalyticsStore()
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-3 font-rubik">
          <BarChart3 className="w-8 h-8 text-primary-two" />
          Analytics Dashboard
        </h1>
        <p className="text-secondary-foreground">
          Comprehensive insights into your CrowdCloud compute usage and performance
        </p>
      </div>

      <Card className="shadow-sm border-0 bg-secondary backdrop-blur-sm h-auto">
        <CardContent>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-primary-two" />
            <span className="text-sm font-medium">Time Period:</span>
            <div className="flex gap-1">
              {(["daily", "weekly", "monthly"] as TimePeriod[]).map((period) => (
                <Button
                  key={period}
                  variant={selectedPeriod === period ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod(period)}
                  className="text-xs"
                >
                  {period === "daily" ? "Daily" : period === "weekly" ? "Weekly" : "Monthly"}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
};
