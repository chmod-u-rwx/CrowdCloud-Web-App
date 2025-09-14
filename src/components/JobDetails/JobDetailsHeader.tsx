import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getJobStatusColor } from "@/utils/utility";
import { useJobsStore } from "@/stores/useJobsStore";
import { ArrowLeft, Edit3, Save, X } from "lucide-react";

export const JobDetailsHeader = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();

  const jobs = useJobsStore((state) => state.jobs);
  const job = jobs.find((j) => j.job_id === jobId);
  
  const isEditing = useJobsStore((state) => state.isEditing);
  const setIsEditing = useJobsStore((state) => state.setIsEditing);

  const setRequestSave = useJobsStore((state) => state.setRequestSave);

  const handleSave = () => {
    setRequestSave(true);
  }

  const handleCancel = () => {
    setRequestSave(false);
    setIsEditing(false);
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="flex flex-col justify-start">
          <div className="flex justify-between">
            <p className="text-3xl font-rubik font-semibold">{job?.job_name}</p>
            <Badge
              className={`${getJobStatusColor(
                job?.status ?? "paused"
              )} border`}
            >
              {job?.status
                ? job.status.charAt(0).toUpperCase() + job.status.slice(1)
                : "Paused"}
            </Badge>
          </div>
          <p className="my-2 text-xl text-secondary-foreground">Job ID: <strong>{job?.job_id}</strong></p>
        </div>

        <div className="flex justify-between">
          <Button
            className="bg-gradient-to-r from-primary to-accent flex items-center gap-2"
            onClick={() => navigate("/dashboard/jobs")}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>

          <div className="flex items-center gap-3">
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent-cyan"
              >
                <Edit3 className="w-4 h-4" />
                Edit Job Details
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleSave} className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save Job Update
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="flex items-center gap-2 hover:text-destructive hover:border-destructive transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel Job Edit
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
