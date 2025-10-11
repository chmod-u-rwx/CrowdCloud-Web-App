import { useParams } from "react-router-dom";
import { useJobRequests } from "@/services/jobRequests";
import { format } from "date-fns";
import { getRequestStatusColor } from "@/utils/utility";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { CheckCircle, List, XCircle } from "lucide-react";

export default function JobRequests() {
  const { jobId } = useParams();
  const { data: requests = [], isLoading } = useJobRequests({ job_id: jobId });

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
          {isLoading ? (
            <Skeleton className="h-10 w-32" />
          ) : (
            requests.map((request) => (
              <div key={request.request_id} className="flex items-center justify-between p-3 border rounded-lg bg-input">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {request.status === "success" ? (
                    <CheckCircle className="w-4 h-4 text-confirm" />
                  ) : (
                    <XCircle className="w-4 h-4 text-destructive" />
                  )}
                  <Badge className="font-mono text-xs rounded-xl bg-secondary">
                    {request.request_payload.method}
                  </Badge>
                </div>
                <div>
                  <p className="font-semibold">{request.request_payload.path}</p>
                  <p className="text-sm font-light">{format(request.timestamp, "PPpp")}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className={`font-medium ${getRequestStatusColor(request.status ?? "")}`}>
                  {request.response_payload.status_code}
                </span>
                <span>{request.execution_time}ms</span>
              </div>
            </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}