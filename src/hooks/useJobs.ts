import { useEffect, useState } from "react"
import { useJobsStore } from "@/stores/useJobsStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { deleteJob, listJobs, updateJob } from "@/services/api";
import { createJob } from "@/features/jobs/api/create-jobs";
import type { JobCreate, JobUpdate } from "@/features/jobs/schemas/job.schema";

export const useJobs = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const jobs = useJobsStore((state) => state.jobs);
  const setJobs = useJobsStore((state) => state.setJobs);

  const user = useAuthStore((state) => state.user);

  // Fetch jobs for the logged-in user
  useEffect(() => {
    const fetchJobs = async () => {
      if(!user?.user_id) return;
      setLoading(true);

      try {
        const jobsList = await listJobs({ user_id: user.user_id });
        setJobs(jobsList);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user?.user_id, setJobs]);

  // Create job
  const handleCreateJob = async (jobData: JobCreate) => {
    setLoading(true);
    try {
      const newJob = await createJob(jobData);
      setJobs([newJob, ...jobs]);
      return newJob;
    } finally {
      setLoading(false);
    }
  };

  // Update job
  const handleUpdateJob = async (job_id: string, updateData: JobUpdate) => {
    setLoading(true);
    try {
      const updatedJob = await updateJob(job_id, updateData);
      setJobs(jobs.map((job) => (job.job_id === job_id ? updatedJob : job)));
      return updatedJob;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (job_id: string) => {
    setLoading(true);
    try {
      await deleteJob(job_id);
      setJobs(jobs.filter((job) => job.job_id !== job_id));
    } finally {
      setLoading(false);
    }
  };

  return {
    jobs,
    loading,
    createJob: handleCreateJob,
    updateJob: handleUpdateJob,
    deleteJob: handleDeleteJob,
  };
};