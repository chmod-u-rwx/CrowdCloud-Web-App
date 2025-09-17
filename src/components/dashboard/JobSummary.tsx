import { useAnalyticsStore } from "@/stores/useAnalyticsStore";
import { getJobStatusColor, getResourceCost } from "@/utils/utility";
import { useJobsStore } from "@/stores/useJobsStore";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent,
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import { format } from "date-fns";
import { Eye, Globe } from "lucide-react";

export default function JobSummary() {
  const navigate = useNavigate();

  const jobs = useJobsStore((state) => state.jobs);
  const filteredJobs = jobs.filter(
    (j) => j.status === "paused" || j.status === "completed"
  );

  const rates = useAnalyticsStore((state) => state.costRates) ?? {
    cpu_core_cost_per_second: 0.03,
    ram_gb_cost_per_second: 0.05,
  };

  return (
    <div className="space-y-6 max-h-[300px] md:max-h-[580px] overflow-auto no-scrollwidth">
      {filteredJobs.map((job) => (
        <Card
          className="shadow border-0 bg-secondary backdrop-blur-sm"
          key={job.job_id}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <CardTitle>Job ID: {job.job_id}</CardTitle>
              <div className="flex items-center gap-2">
                <Badge
                  className={`${getJobStatusColor(
                    job.status
                  )} border rounded-full border-foreground`}
                >
                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 ">
              <div className="flex flex-col p-2 items-center gap-2 border bg-input border-primary-two">
                <span className="text-secondary-foreground text-sm">Date</span>
                <span className="font-semibold text-md">
                  {job?.created_at
                    ? format(new Date(job.created_at), "MMMM d, yyyy")
                    : ""}
                </span>
              </div>
              <div className="flex flex-col p-2 items-center gap-2 border bg-input border-primary-two">
                <span className="text-secondary-foreground text-sm">
                  Job Name
                </span>
                <span className="font-semibold text-md">{job.job_name}</span>
              </div>
              <div className="flex flex-col p-2 items-center gap-2 border bg-input border-primary-two">
                <span className="text-secondary-foreground text-sm">
                  Amount
                </span>
                <span className="font-semibold text-md">
                  ₱
                  {job.resources
                    ? getResourceCost(job.resources, rates).totalCost
                    : 0}{" "}
                  /secs
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 mt-4">
              <div className="flex items-center">
                <span className="flex items-center text-secondary-foreground hover:text-primary-two">
                  <Globe className="w-4 h-4 mr-2" />
                  {job.job_id}.cottonbuds.dev
                </span>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate(`/dashboard/jobs/${job.job_id}`)}
                  className="flex items-center gap-1"
                >
                  <Eye className="w-3 h-3" />
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};