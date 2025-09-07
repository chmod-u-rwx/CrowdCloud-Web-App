import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { jobCreateSchema } from "@/schema/schemas";
import type { CreateJobRequest } from "@/types";
import type { InferType } from "yup";
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


type JobCreateFormData = InferType<typeof jobCreateSchema>;

interface JobCreationFormProps {
  onCreateJob: (job: CreateJobRequest) => Promise<void>;
  loading?: boolean;
}

export const JobCreationForm = ({
  onCreateJob,
  loading = false
}: JobCreationFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<JobCreateFormData>({
    resolver: yupResolver(jobCreateSchema),
    defaultValues: {
      jobName: "",
      jobURL: "",
      jobDescription: "",
      cpu: 2,
      ram: 4,
    },
  });

  const cpu = watch("cpu");
  const ram = watch("ram");

  const onSubmit = async (jobData: JobCreateFormData) => {
    if (!jobData) {
      return;
    }

    const jobRequest: CreateJobRequest = {
      jobId: "", 
      jobName: jobData.jobName,
      jobUrl: jobData.jobURL,
      jobDescription: jobData.jobDescription,
      resources: {
        cpu: jobData.cpu,
        ram: jobData.ram,
      },
    };

    try {
      await onCreateJob(jobRequest);
      console.log("Form Data:", jobData);
      
      toast.success("Job created successfully");
      reset();
    } catch (error) {
      toast.error("Failed to create job. Please try again.")
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
                <Label htmlFor="jobName">
                  Job Name <span className="text-destructive">*</span>
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
                <Label htmlFor="jobURL">
                  Job URL <span className="text-destructive">*</span>
                </Label>
                <Input
                  {...register("jobURL")}
                  placeholder="https://example.com/user/repo"
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobDescription">
                Job Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                {...register("jobDescription")}
                placeholder="Describe what your job does, its requirements, and expected output..."
                className={`bg-input border-2 min-h-[100px] ${
                  errors.jobDescription ? "border-destructive" : ""
                }`}
              />
              {errors.jobDescription && (
                <span className="text-sm text-destructive">
                  {errors.jobDescription.message}
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
                  {...register("cpu")}
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
                <p className="text-xs text-muted-foreground">Range: 1 - 32 cores</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ram">
                  <MemoryStick className="w-4 h-4 text-muted-foreground" />
                  RAM (GB) <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="number"
                  {...register("ram")}
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
                <p className="text-xs text-muted-foreground">Range: 1 - 128 GB</p>
              </div>
            </div>

            {/* Resource Summary */}
            <div className="p-4 bg-purple-200 rounded-lg border border-primary">
              <h4 className="font-medium text-purple-900 mb-2 font-rubik">Resource Summary</h4>
              <div className="flex gap-4">
                <Badge variant="secondary" className="bg-accent text-foreground">
                  {cpu} CPU Core{Number(cpu) === 1 ? "" : "s"}
                </Badge>
                <Badge variant="secondary" className="bg-accent text-foreground">
                  {ram} GB RAM
                </Badge>
              </div>
              <p className="text-sm text-purple-900 mt-2">
                Estimated cost: ~₱{(Number(cpu) * 0.08 + Number(ram) * 0.09).toFixed(2)} /secs
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