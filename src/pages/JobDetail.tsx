import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useJobsStore } from "@/stores/useJobsStore";
import { JobDetailsHeader } from "@/components/JobDetails/JobDetailsHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobDetailsOverview } from "@/components/JobDetails/JobDetailsOverview";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JobDetailsOverviewStats } from "@/components/JobDetails/JobDetailsOverviewStats";
import JobTraffic from "@/components/JobDetails/JobTraffic";
import JobErrors from "@/components/JobDetails/JobErrors";
import GlowBackground from "@/components/utils/GlowBackground";
import JobRequests from "@/components/JobDetails/JobRequests";
import { 
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  Bug,
  Eye,
  List
} from "lucide-react";

export const JobDetail = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const jobs = useJobsStore((state) => state.jobs);
  const job = jobs.find((j) => j.job_id === jobId);

  const [activeTab, setActiveTab] = useState("overview");

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-rubik font-semibold mb-2">Job Not Found</h2>
            <p className="text-secondary-foreground mb-4">The requested job could not be found.</p>
            <Button onClick={() => navigate('/dashboard/jobs')} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  };

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

          <TabsContent value="errors" className="space-y-6">
            <JobErrors />
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <JobRequests />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};