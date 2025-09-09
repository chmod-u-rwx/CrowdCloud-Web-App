import type { Job } from "@/types";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getJobStats, getJobStatusColor } from "@/utils/utility";
import { formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  CheckCircle,
  Cpu,
  ExternalLink,
  Eye,
  MemoryStick,
  Pause,
  Play,
  RotateCcw,
  Trash2,
} from "lucide-react";

interface JobListProps {
  jobs: Job[];
  onDeleteJob: (jobId: string) => void;
  onUpdateStatus: (jobId: string, status: Job["status"]) => void;
}

export const JobList = ({
  jobs,
  onDeleteJob,
  onUpdateStatus,
}: JobListProps) => {
  const navigate = useNavigate();
  const [loadingJobs, setLoadingJobs] = useState<Set<string>>(new Set());
  const stats = getJobStats(jobs);

  const handleJobStatusUpdate = async (
    job_id: string,
    newStatus: Job["status"]
  ) => {
    setLoadingJobs((prev) => new Set(prev).add(job_id));

    // For Mock up logic: Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    onUpdateStatus(job_id, newStatus);
    setLoadingJobs((prev) => {
      const newSet = new Set(prev);
      newSet.delete(job_id);
      return newSet;
    });
  };

  const getStatusActions = (job: Job) => {
    const isLoading = loadingJobs.has(job.job_id);

    switch (job.status) {
      case "pending":
        return (
          <Button
            size="sm"
            onClick={() => handleJobStatusUpdate(job.job_id, "running")}
            disabled={isLoading}
            className="flex items-center gap-1"
          >
            <Play className="w-3 h-3" />
            Start
          </Button>
        );
      case "running":
        return (
          <Button
            size="sm"
            onClick={() => handleJobStatusUpdate(job.job_id, "completed")}
            disabled={isLoading}
            className="flex items-center gap-1"
          >
            <Pause className="w-3 h-3" />
            Stop
          </Button>
        );
      case "failed":
        return (
          <Button
            size="sm"
            onClick={() => handleJobStatusUpdate(job.job_id, "pending")}
            disabled={isLoading}
            className="flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            Retry
          </Button>
        );
      case "completed":
        return (
          <div className="flex items-center gap-1 text-confirm">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Done</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 max-h-[300px] md:max-h-[580px] overflow-auto no-scrollwidth">
      {/* Header */}
      <div className="space-y-2 mt-2">
        <h2 className="font-semibold font-rubik">
          My Jobs ({stats.totalJobs})
        </h2>
      </div>

      {/* Job List */}
      {jobs.map((job) => (
        <Card
          key={job.job_id}
          className="shadow shadow-accent-shadow border-0 bg-secondary backdrop-blur-sm hover:shadow-lg transition-shadow"
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg font-bold">
                  {job.job_name}
                </CardTitle>
                <CardDescription className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4" />
                  Created{" "}
                  {job.created_at
                    ? formatDistanceToNow(job.created_at, { addSuffix: true })
                    : "Unknown"}
                </CardDescription>
              </div>

              <div className="flex items-center gap-2">
                <Badge className={`${getJobStatusColor(job.status)} border`}>
                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="space-y-4">
              <p className="text-secondary-foreground line-clamp-2 md:text-base">
                {job.job_description}
              </p>
            </div>

            {/* Job URL */}
            <div className="flex items-center gap-2 my-4">
              <ExternalLink className="w-4 h-4 text-secondary-foreground" />
              <code className="bg-input text-sm px-2 py-1 rounded text-muted-foreground">
                {job.repo_url}
              </code>
            </div>

            {/* Resource Information */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-secondary-foreground" />
                <span className="font-medium text-secondary-foreground">
                  {job.resources.cpu} CPU cores
                </span>
              </div>

              <div className="flex items-center gap-2">
                <MemoryStick className="w-4 h-4 text-secondary-foreground" />
                <span className="font-medium text-secondary-foreground">
                  {job.resources.ram} GB RAM
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-medium text-secondary-foreground">
                  Cost:
                </span>
                <span className="font-medium text-confirm">
                  ₱
                  {(
                    job.resources.cpu * 0.08 +
                    job.resources.ram * 0.09
                  ).toFixed(2)}{" "}
                  /secs
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t my-4">
              <div className="flex items gap-2 flex-col">
                <p className="text-secondary-foreground">Job ID: {job.job_id}</p>
                <Link
                  to="https://github.com/0CottonBuds"
                  className="flex items-center text-secondary-foreground hover:underline hover:text-primary-two"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {job.job_id}.cottonbuds.dev
                </Link>
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

                <div className="flex items-center gap-2">
                  {getStatusActions(job)}
                </div>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDeleteJob(job.job_id)}
                  className="flex items-center gap-1 text-destructive bg-transparent border border-destructive hover:text-destructive/90 hover:border-red-700 hover:bg-transparent"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete Job
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};