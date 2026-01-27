import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  createJobInputSchema,
  type CreateJobInput 
} from "@/features/jobs/api/create-jobs";
import { useAuthStore } from "@/stores/useAuthStore";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Cpu, Loader2, MemoryStick, Plus } from "lucide-react";
import type { JobCreate } from "@/features/jobs/schemas/job.schema";

interface JobCreationFormProps {
  onCreateJob: (job: JobCreate) => Promise<void>;
  loading?: boolean;
}

export const JobCreationForm = ({
  onCreateJob,
  loading = false,
}: JobCreationFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<CreateJobInput>({
    resolver: zodResolver(createJobInputSchema),
    defaultValues: {
      job_name: "",
      repo_url: "",
      job_description: "",
      cpu: 0,
      ram: 0,
    },
  });

  const cpu = watch("cpu");
  const ram = watch("ram");

  const user = useAuthStore.getState().user;

  const onSubmit = async (jobData: CreateJobInput) => {
    if (!jobData) return;

    if (!user?.user_id) {
      toast.error("You must be logged in to create a job.");
      return;
    }

    const jobRequest: JobCreate = {
      user_id: user?.user_id ?? "",
      job_name: jobData.job_name,
      repo_url: jobData.repo_url,
      job_description: jobData.job_description,
      resources: {
        cpu: jobData.cpu,
        ram: jobData.ram,
      },
    };

    try {
      await onCreateJob(jobRequest);
      // console.log("Form Data:", jobData);

      toast.success("Job created successfully");
      reset();
    } catch (error: any) {
      console.error("Create Job failed:", error?.response?.data || error);
      toast.error("Failed to create job. Please try again.");
    }
  };

  return (
    <Card className="w-full max-w-2xl mt-3 mx-auto shadow shadow-accent-shadow border-0 bg-secondary backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold font-rubik flex items-center gap-2">
          <Plus className="w-6 h-6 text-primary-two" />
          Create New Job
        </CardTitle>
        <CardDescription>
          Deploy a new compute job on CrowdCloud
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit, () => {
            toast.error("Please fix the form errors before submitting");
          })}
          className="space-y-4"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="job_name">
                  Job Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  {...register("job_name")}
                  placeholder="Enter Job Name"
                  className={`bg-input border-2 ${
                    errors.job_name ? "border-destructive" : ""
                  }`}
                />
                {errors.job_name && (
                  <span className="text-sm text-destructive">
                    {errors.job_name.message}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="repo_url">
                  Job URL <span className="text-destructive">*</span>
                </Label>
                <Input
                  {...register("repo_url")}
                  placeholder="https://example.com/user/repo"
                  className={`bg-input border-2 ${
                    errors.repo_url ? "border-destructive" : ""
                  }`}
                />
                {errors.repo_url && (
                  <span className="text-sm text-destructive">
                    {errors.repo_url.message}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="job_description">
                Job Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                {...register("job_description")}
                placeholder="Describe what your job does, its requirements, and expected output..."
                className={`bg-input border-2 min-h-25 ${
                  errors.job_description ? "border-destructive" : ""
                }`}
              />
              {errors.job_description && (
                <span className="text-sm text-destructive">
                  {errors.job_description.message}
                </span>
              )}
            </div>
          </div>

          <Separator className="bg-primary" />

          {/* Resource Allocation */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-semibold font-rubik">
                Expected Allocated Resources
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cpu">
                  <Cpu className="w-4 h-4 text-muted-foreground" />
                  CPU Cores <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="number"
                  {...register("cpu", { valueAsNumber: true })}
                  placeholder="2 Cores"
                  min={1}
                  max={32}
                  className={`bg-input border-2 ${
                    errors.cpu ? "border-destructive" : ""
                  }`}
                />
                {errors.cpu && (
                  <span className="text-sm text-destructive">
                    {errors.cpu.message}
                  </span>
                )}
                <p className="text-xs text-muted-foreground">
                  Range: 1 - 32 cores
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ram">
                  <MemoryStick className="w-4 h-4 text-muted-foreground" />
                  RAM (GB) <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="number"
                  {...register("ram", { valueAsNumber: true })}
                  placeholder="2 GB"
                  min={1}
                  max={128}
                  className={`bg-input border-2 ${
                    errors.ram ? "border-destructive" : ""
                  }`}
                />
                {errors.ram && (
                  <span className="text-sm text-destructive">
                    {errors.ram.message}
                  </span>
                )}
                <p className="text-xs text-muted-foreground">
                  Range: 1 - 128 GB
                </p>
              </div>
            </div>

            {/* Resource Summary */}
            <div className="p-4 bg-purple-200 rounded-lg border border-primary">
              <h4 className="font-medium text-purple-900 mb-2 font-rubik">
                Resource Summary
              </h4>
              <div className="flex gap-4">
                <Badge
                  variant="secondary"
                  className="bg-accent text-foreground"
                >
                  {cpu} CPU Core{Number(cpu) === 1 ? "" : "s"}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-accent text-foreground"
                >
                  {ram} GB RAM
                </Badge>
              </div>
              <p className="text-sm text-purple-900 mt-2">
                Estimated cost: ~₱
                {(Number(cpu) * 0.03 + Number(ram) * 0.05).toFixed(2)} /secs
              </p>
            </div>
          </div>

          <Separator className="bg-primary" />

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={loading || isSubmitting}
          >
            {loading || isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Job...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Create Job
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
