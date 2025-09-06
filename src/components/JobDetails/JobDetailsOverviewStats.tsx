import { useJobsStore } from "@/stores/useJobsStore";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import useMockLogs from "@/mock/mock-logs";
import { AlertTriangle, CheckCircle, Clock, Send } from "lucide-react";

export const JobDetailsOverviewStats = () => {
  const { jobId } = useParams();
  const jobs = useJobsStore((state) => state.jobs);
  const job = jobs.find((j) => j.jobId === jobId);

  const { mockTrafficData, mockErrorLogs } = useMockLogs(job);

  const totalRequests = mockTrafficData.reduce((sum, item) => sum + item.requests, 0);
  const totalSucessful = mockTrafficData.reduce((sum, item) => sum + item.successfulRequest, 0);
  const avgResponseTime = mockTrafficData.reduce((sum, item) => sum + item.avgResponseTime, 0) / mockTrafficData.length;
  const successRate = totalRequests > 0 ? (totalSucessful / totalRequests) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="border-0 shadow shadow-accent-shadow backdrop-blur-sm">
        <CardContent className="">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Requests (24h)</p>
              <p className="text-2xl font-bold">{totalRequests.toLocaleString()}</p>
            </div>
            <Send className="w-8 h-8 text-primary-two" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow shadow-accent-shadow">
        <CardContent className="">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Success Rate</p>
              <p className="text-2xl font-bold">{successRate.toFixed(2)}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-confirm" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow shadow-accent-shadow">
        <CardContent className="">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Response</p>
              <p className="text-2xl font-bold">{avgResponseTime.toFixed(0)}ms</p>
            </div>
            <Clock className="w-8 h-8 text-primary-two" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow shadow-accent-shadow">
        <CardContent className="">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Errors (24h)</p>
              <p className="text-2xl font-bold">{mockErrorLogs.length}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
};