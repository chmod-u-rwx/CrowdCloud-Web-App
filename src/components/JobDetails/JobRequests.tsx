import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { CheckCircle, List, XCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { useJobsStore } from "@/stores/useJobsStore";
import useMockLogs from "@/mock/mock-logs";
import { Badge } from "../ui/badge";
import { format } from "date-fns";
import { getRequestStatusColor } from "@/utils/utility";

export default function JobRequests() {
  const { jobId } = useParams();
  const jobs = useJobsStore((state) => state.jobs);
  const job = jobs.find((j) => j.job_id === jobId);

  const { mockRequestLogs } = useMockLogs(job);

  return (
    <Card className="shadow shadow-accent-shadow border-0 backdrop-blur-sm mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-rubik text-xl">
          <List className="w-5 h-5 text-primary-two" />
          Request Logs
        </CardTitle>
        <CardDescription>Recent API requests for this job</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockRequestLogs.map((request) => (
            <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg bg-input">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {request.status === "completed" ? (
                    <CheckCircle className="w-4 h-4 text-confirm" />
                  ) : (
                    <XCircle className="w-4 h-4 text-destructive" />
                  )}
                  <Badge className="font-mono text-xs rounded-xl bg-secondary">
                    {request.method}
                  </Badge>
                </div>
                <div>
                  <p className="font-semibold">{request.endpoint}</p>
                  <p className="text-sm font-light">{format(request.timestamp, "PPpp")}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className={`font-medium ${getRequestStatusColor(request.status)}`}>
                  {request.statusCode}
                </span>
                <span>{request.responseTime}ms</span>
                {request.errorMessage && (
                  <span className="text-destructive">{request.errorMessage}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
