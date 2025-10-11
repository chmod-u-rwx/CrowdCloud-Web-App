import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getJobStats } from "@/utils/utility";
import { Activity, Cpu } from "lucide-react";
import { useJobsStore } from "@/stores/useJobsStore";
import { useAnalytics } from "@/hooks/useAnalytics";

export const JobOverviewStats = () => {
  const jobs = useJobsStore((state) => state.jobs);
  const stats = getJobStats(jobs);

  const { analytics } = useAnalytics({ jobs })

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-3">
      <Card className="shadow shadow-accent-shadow border-0 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 md:text-2xl font-rubik">
            <Activity className="w-5 h-5 text-primary-two" />
            Job Status Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-base">Paused</span>
            <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-700 rounded">
              {jobs.filter(j => j.status === "paused").length}
            </Badge>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-base">Running</span>
            <Badge variant="outline" className="bg-blue-100 text-indigo-700 border-indigo-700 rounded">
              {jobs.filter(j => j.status === "running").length}
            </Badge>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-base">Completed</span>
            <Badge variant="outline" className="bg-green-100 text-green-700 border-green-700 rounded">
              {jobs.filter(j => j.status === "completed").length}
            </Badge>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-base">Failed</span>
            <Badge variant="outline" className="bg-red-100 text-red-700 border-red-700 rounded">
              {jobs.filter(j => j.status === "failed").length}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Resource Allocation */}
      <Card className="shadow shadow-accent-shadow border-0 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 md:text-2xl font-rubik">
            <Cpu className="w-5 h-5 text-accent" />
            Resource Allocation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-base">
              <span className="text-secondary-foreground">Total CPU Cores: <strong className="text-foreground">{stats.totalCPUUsed}</strong></span>
              <span className="font-medium">₱{analytics.cpuMonthlyCost.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-base">
              <span className="text-secondary-foreground">Total RAM (GB): <strong className="text-foreground">{stats.totalRAMUsed}</strong></span>
              <span className="font-medium">₱{analytics.ramMonthlyCost.toFixed(2)}</span>
            </div>
          </div>

          <div className="pt-2 border-t">
            <div className="flex justify-between md:text-base text-sm ">
              <span>Estimated Monthly Cost</span>
              <span className="text-medium text-confirm text-sm md:text-base">
                ₱{analytics.estimatedMonthlyCost.toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};