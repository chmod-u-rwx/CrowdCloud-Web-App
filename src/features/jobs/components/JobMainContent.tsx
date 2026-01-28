import { useState } from "react";
import { useJobs } from "@/hooks/useJobs";
import type { JobCreate } from "@/types/jobs";
import { JobOverviewStats } from "@/features/jobs/components/JobOverviewStats";
import { JobList } from "@/features/jobs/components/JobList";
import { JobCreationForm } from "@/features/jobs/components/JobCreationForm";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export const JobMainContent = () => {
  const { createJob, deleteJob, updateJob, loading, jobs } = useJobs();
  const [activeTab, setActiveTab] = useState("overview");

  const handleCreateJob = async (jobData: JobCreate) => {
    await createJob(jobData);
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3 shadow shadow-accent-shadow">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="create">Create Job</TabsTrigger>
        <TabsTrigger value="jobs">My Jobs</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <JobOverviewStats />
      </TabsContent>

      <TabsContent value="create" className="space-y-6">
        <JobCreationForm 
          onCreateJob={handleCreateJob}
          loading={loading}
        />
      </TabsContent>

      <TabsContent value="jobs" className="space-y-6">
        <JobList 
          jobs={jobs}
          onDeleteJob={deleteJob}
          onUpdateStatus={(jobId, status) => {
            updateJob(jobId, { status });
          }}
        />
      </TabsContent>
    </Tabs>
  )
};