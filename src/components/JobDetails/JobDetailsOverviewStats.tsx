import { useJobsStore } from "@/stores/useJobsStore";
import { useParams } from "react-router-dom";
import { useRequestMetrics } from "@/hooks/useRequestMetrics";
import { Card, CardContent } from "@/components/ui/card";
import useMockLogs from "@/mock/mock-logs";
import { AlertTriangle, CheckCircle, Clock, Send } from "lucide-react";

export const JobDetailsOverviewStats = () => {
  const { jobId } = useParams();
  const { requests } = useRequestMetrics({ job_id: jobId });
  const jobs = useJobsStore((state) => state.jobs);
  const job = jobs.find((j) => j.job_id === jobId);

  const totalRequests = requests.length;
  const totalSuccessful = requests.filter(r => r.status === "success").length;
  const avgResponseTime = requests.length > 0
    ? requests.reduce(
        (sum: number, r) => 
          sum + (
            typeof r.execution_time === "number" 
            ? r.execution_time : 0
          ), 0
      ) / requests.length
    : 0;
  
  const successRate = totalRequests > 0 ? (totalSuccessful / totalRequests) * 100 : 0;
  const { mockErrorLogs } = useMockLogs(job);

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
              <p className="text-2xl font-bold">{successRate.toFixed(1)}</p>
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
              <p className="text-2xl font-bold">{avgResponseTime.toFixed(2)}ms</p>
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