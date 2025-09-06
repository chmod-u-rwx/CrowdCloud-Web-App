import { useEffect } from "react";
import { useJobsStore } from "@/stores/useJobsStore";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { jobCreateSchema } from "@/schema/schemas";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Calendar, Cpu, MemoryStick, Settings } from "lucide-react";

interface EditFormData {
  jobName: string;
  jobURL: string;
  jobDescription: string;
  cpu: number;
  ram: number;
}

export const JobDetailsOverview = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const jobs = useJobsStore((state) => state.jobs);
  const job = jobs.find((j) => j.jobId === jobId);

  const isEditing = useJobsStore((state) => state.isEditing);
  const setIsEditing = useJobsStore((state) => state.setIsEditing);
  const requestSave = useJobsStore((state) => state.requestSave);
  const setRequestSave = useJobsStore((state) => state.setRequestSave);
  const updateJob = useJobsStore((state) => state.updateJob);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditFormData>({
    resolver: yupResolver(jobCreateSchema),
    defaultValues: {
      jobName: job?.jobName || "",
      jobURL: job?.jobUrl || "",
      jobDescription: job?.jobDescription || "",
      cpu: job?.resources.cpu || 1,
      ram: job?.resources.ram || 1,
    },
  });

  // When job changes (e.g. switching jobs), reset form values.
  useEffect(() => {
    if (job) {
      reset({
        jobName: job.jobName,
        jobURL: job.jobUrl,
        jobDescription: job.jobDescription,
        cpu: job.resources.cpu,
        ram: job.resources.ram,
      });
    }
  }, [job, reset]);

  // Listen for save trigger from header
  useEffect(() => {
    if (requestSave) {
      handleSubmit((data) => {
        if (!job) return;

        updateJob({
          ...job,
          jobName: data.jobName,
          jobUrl: data.jobURL,
          jobDescription: data.jobDescription,
          resources: {
            cpu: data.cpu,
            ram: data.ram,
          },
        });
        setIsEditing(false);
        setRequestSave(false);
      })();
    }
  }, [requestSave, handleSubmit, job, updateJob, setIsEditing, setRequestSave]);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        {/* Job Information */}
        <Card className="shadow border-0 bg-secondary shadow-accent-shadow backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary-two" />
              <span className="text-2xl font-semibold font-rubik">
                Job Information
              </span>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {isEditing ? (
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-md font-medium text-muted-foreground">
                    Job Name
                  </Label>
                  <Input
                    {...register("jobName")}
                    placeholder="Enter Job Name"
                    className={`bg-input border-2 ${
                      errors.jobName ? "border-destructive" : ""
                    }`}
                  />
                  {errors.jobName && (
                    <span className="text-sm text-destructive">
                      {errors.jobName.message}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-md font-medium text-muted-foreground">
                    Job URL
                  </Label>
                  <Input
                    {...register("jobURL")}
                    placeholder="Enter Job URL"
                    className={`bg-input border-2 ${
                      errors.jobURL ? "border-destructive" : ""
                    }`}
                  />
                  {errors.jobURL && (
                    <span className="text-sm text-destructive">
                      {errors.jobURL.message}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-md font-medium text-muted-foreground">
                    Job Description
                  </Label>
                  <Textarea
                    {...register("jobDescription")}
                    placeholder="Describe what your job does, its requirements, and expected output..."
                    className={`bg-input border-2 ${
                      errors.jobDescription ? "border-destructive" : ""
                    }`}
                  />
                  {errors.jobDescription && (
                    <span className="text-sm text-destructive">
                      {errors.jobDescription.message}
                    </span>
                  )}
                </div>
              </form>
            ) : (
              <>
                <div className="space-y-2">
                  <Label className="text-md font-medium text-muted-foreground">
                    Job Name
                  </Label>
                  <p className="font-bold text-xl">{job?.jobName}</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-md font-medium text-muted-foreground">
                    Job URL
                  </Label>
                  <p className="font-medium text-md">{job?.jobUrl}</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-md font-medium text-muted-foreground">
                    Job Description
                  </Label>
                  <p className="font-medium text-md">{job?.jobDescription}</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-md font-medium text-muted-foreground">
                    Created
                  </Label>
                  <p className="font-medium text-secondary-foreground text-md flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    {job?.createdAt ? format(job.createdAt, "PPpp") : "N/A"}
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Resource Configuration */}
        <Card className="shadow border-0 bg-secondary shadow-accent-shadow backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-primary-two" />
              <span className="text-2xl font-semibold font-rubik">
                Resource Configuration
              </span>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {isEditing ? (
              <form className="space-y-2 grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-md font-medium text-muted-foreground">
                    CPU Cores
                  </Label>
                  <Input
                    type="number"
                    {...register("cpu")}
                    placeholder="Enter CPU cores"
                    className={`bg-input border-2 ${
                      errors.cpu ? "border-destructive" : ""
                    }`}
                  />
                  {errors.cpu && (
                    <span className="text-sm text-destructive">
                      {errors.cpu.message}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-md font-medium text-muted-foreground">
                    RAM
                  </Label>
                  <Input
                    type="number"
                    {...register("ram")}
                    placeholder="Enter RAM (GB)"
                    className={`bg-input border-2 ${
                      errors.ram ? "border-destructive" : ""
                    }`}
                  />
                  {errors.ram && (
                    <span className="text-sm text-destructive">
                      {errors.ram.message}
                    </span>
                  )}
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-md font-medium text-muted-foreground">
                    CPU Cores
                  </Label>
                  <p className="font-medium text-md flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-primary-two" />
                    {job?.resources.cpu} Cores
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-md font-medium text-muted-foreground">
                    RAM
                  </Label>
                  <p className="font-medium text-md flex items-center gap-2">
                    <MemoryStick className="w-4 h-4 text-primary-two" />
                    {job?.resources.ram} (GB)
                  </p>
                </div>
              </div>
            )}

            <Separator className="bg-primary-two" />

            <div className="space-y-2">
              <h4 className="font-semibold text-lg text-secondary-foreground">
                Cost Estimation
              </h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>CPU Cost (₱0.08 /seconds):</span>
                  <span className="font-medium">
                    ₱
                    {(
                      ((isEditing ? job?.resources.cpu : job?.resources.cpu) ??
                        0) * 0.08
                    ).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>RAM Cost (₱0.09 /seconds):</span>
                  <span className="font-medium">
                    ₱
                    {(
                      ((isEditing ? job?.resources.ram : job?.resources.ram) ??
                        0) * 0.09
                    ).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between font-medium text-confirm my-2 py-2 border-t border-primary-two">
                  <span>Total Hourly Cost:</span>
                  <span>
                    ₱
                    {(
                      ((isEditing ? job?.resources.cpu : job?.resources.cpu) ??
                        0) *
                        0.08 +
                      ((isEditing ? job?.resources.ram : job?.resources.ram) ??
                        0) *
                        0.09
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
