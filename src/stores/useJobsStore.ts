import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Job } from "@/types";

interface JobState {
  jobs: Job[];
  loading: boolean;
  isEditing: boolean;
  requestSave: boolean;
  setIsEditing: (editing: boolean) => void;
  setRequestSave: (val: boolean) => void;
  setJobs: (jobs: Job[]) => void;
  updateJob: (updatedJob: Job) => void;
}

const JobStoreLogic = persist<JobState>(
  (set) => ({
    jobs: [],
    loading: false,
    isEditing: false,
    requestSave: false,
    setIsEditing: (editing) => set({ isEditing: editing }),
    setRequestSave: (val) => set({ requestSave: val }),
    setJobs: (jobs) => set({ jobs }),
    updateJob: (updatedJob) => set((state) => ({
      jobs: state.jobs.map((job) => 
        job.job_id === updatedJob.job_id ? updatedJob : job
      ),
    }))
  }),
  {
    name: "jobs-storage",
  }
);

export const useJobsStore = create<JobState>()(
  JobStoreLogic
);