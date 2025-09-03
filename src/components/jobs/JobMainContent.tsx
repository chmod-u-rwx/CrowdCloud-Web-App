import { useState } from "react";
import type { CreateJobRequest } from "@/types";
import { useJobs } from "@/hooks/useJobs";
import { JobOverviewStats } from "@/components/jobs/JobOverviewStats";
import { JobList } from "@/components/jobs/JobList";
import { JobCreationForm } from "@/components/jobs/JobCreationForm";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export const JobMainContent = () => {
  const { createJob, deleteJob, updateJobStatus, loading, jobs } = useJobs();
  const [activeTab, setActiveTab] = useState("overview");

  const handleCreateJob = async (jobData: CreateJobRequest) => {
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
          onUpdateStatus={updateJobStatus}
        />
      </TabsContent>
    </Tabs>
  );
}
