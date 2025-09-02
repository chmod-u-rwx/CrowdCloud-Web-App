import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobOverviewStats } from "@/components/jobs/JobOverviewStats";

export const JobsMainContent = () => {
  const [activeTab, setActiveTab] = useState("overview");

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
    </Tabs>
  );
}
