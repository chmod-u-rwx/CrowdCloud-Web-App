import { useEffect, useState } from "react"
import { createMockJobs } from "@/mock/mock-data";
import type { CreateJobRequest, Job } from "@/types"
import { useJobsStore } from "@/stores/useJobsStore";

const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    useJobsStore.getState().setJobs(jobs)
  }, [jobs]);

  useEffect(() => {
    const initializeJobs = () => {
      // const savedJobs = localStorage.getItem(STORAGE_KEY);

      const mockJobs = createMockJobs();
      setJobs(mockJobs);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockJobs));
    };

    initializeJobs();
  }, []);

  useEffect(() => {
    if (jobs.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
    }
  }, [jobs]);

  const createJob = async (jobData: CreateJobRequest): Promise<Job> => {
    setLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const newJob: Job = {
      ...jobData,
      jobId: crypto.randomUUID(),
      status: "pending",
      createdAt: new Date(),
    };

    setJobs(prevJobs => [newJob, ...prevJobs]);
    setLoading(false);

    return newJob;
  };

  const deleteJob = (jobId: string) => {
    setJobs(prevJobs => prevJobs.filter(job => job.jobId !== jobId));
  };

  const updateJobStatus = (jobId: string, status: Job["status"]) => {
    setJobs(prevJobs =>
      prevJobs.map(job =>
        job.jobId === jobId ? { ...job, status } : job
      )
    );
  };

  const updateJob = (updatedJob: Job) => {
    setJobs(prevJobs => 
      prevJobs.map(job => 
        job.jobId === updatedJob.jobId ? updatedJob : job
      )
    );
  };

  return {
    createJob,
    deleteJob,
    updateJobStatus,
    updateJob,
    jobs,
    loading,
  };
};