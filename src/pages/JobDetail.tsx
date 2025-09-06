import { useState } from "react";
import { JobDetailsHeader } from "@/components/JobDetails/JobDetailsHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobDetailsOverview } from "@/components/JobDetails/JobDetailsOverview";
import GlowBackground from "@/components/utils/GlowBackground";
import { JobDetailsOverviewStats } from "@/components/JobDetails/JobDetailsOverviewStats";
import { BarChart3, Bug, Eye, List } from "lucide-react";
import JobTraffic from "@/components/JobDetails/JobTraffic";

export const JobDetail = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col">
      <GlowBackground />
      <div className="container mx-auto py-4 px-4 z-4 space-y-6">
        {/* Header */}
        <JobDetailsHeader />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-input shadow-md shadow-accent-shadow">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="traffic" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Traffic
            </TabsTrigger>
            <TabsTrigger value="errors" className="flex items-center gap-2">
              <Bug className="w-4 h-4" />
              Errors
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex items-center gap-2">
              <List className="w-4 h-4" />
              Requests
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <JobDetailsOverview />
            <JobDetailsOverviewStats />
          </TabsContent>

          <TabsContent value="traffic" className="space-y-6">
            <JobTraffic />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};