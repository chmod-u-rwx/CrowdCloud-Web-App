import z from "zod";

export const createJobInputSchema = z.object({
  job_name: z.string().min(1, "Job Name is required"),
  repo_url: z.url("Must be a valid URL").min(1, "Job URL is required"),
  job_description: z.string().min(1, "Job Description is required"),
  cpu: z
    .number("CPU is required")
    .min(1, "CPU must be at least 1 core")
    .max(32, "CPU must not exceed to 32 cores"),
  ram: z
    .number("RAM is required")
    .min(1, "RAM must be at least 1 GB")
    .max(128, "RAM must not exceed to 128 GB")
});

export type CreateJobInput = z.infer<typeof createJobInputSchema>;