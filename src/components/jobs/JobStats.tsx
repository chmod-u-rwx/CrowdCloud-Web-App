import { Card, CardContent } from "@/components/ui/card";
import { useJobs } from "@/hooks/useJobs";
import { getJobStats } from "@/utils/jobStats";
import { Activity, Cloud } from "lucide-react";

export const JobStats = () => {
  const { jobs } = useJobs();

  const stats = getJobStats(jobs);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-b from-background to-accent-cyan border-0 rounded-lg shadow-md shadow-accent-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary-foreground font-rubik">Total Jobs</p>
              <p className="text-3xl font-bold">{stats.totalJobs}</p>
            </div>
            <Cloud className="w-10 h-10" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-b from-background to-emerald-400 border-0 rounded-lg shadow-md shadow-accent-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary-foreground font-rubik">Running</p>
              <p className="text-3xl font-bold">{stats.runningJobs}</p>
            </div>
            <Activity className="w-10 h-10" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-b from-background to-accent border-0 rounded-lg shadow-md shadow-accent-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary-foreground font-rubik">CPU Cores</p>
              <p className="text-3xl font-bold">{stats.totalCPUUsed}</p>
            </div>
            <Cloud className="w-10 h-10" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-b from-background to-amber-500 border-0 rounded-lg shadow-lg shadow-accent-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary-foreground font-rubik">RAM (GB)</p>
              <p className="text-3xl font-bold">{stats.totalRAMUsed}</p>
            </div>
            <Cloud className="w-10 h-10" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};