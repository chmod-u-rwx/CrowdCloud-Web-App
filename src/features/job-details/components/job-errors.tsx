import useMockLogs from "@/mock/mock-logs";
import { useJobsStore } from "@/stores/useJobsStore";
import { format } from "date-fns";
import { useParams } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Bug, CheckCircle } from "lucide-react";

export default function JobErrors() {
  const { jobId } = useParams();
  const jobs = useJobsStore((state) => state.jobs);
  const job = jobs.find((j) => j.job_id === jobId);

  const { mockErrorLogs } = useMockLogs(job);

  return (
    <Card className="border-0 shadow shadow-accent-shadow backdrop-blur-sm mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-rubik text-xl">
          <Bug className="w-5 h-5 text-primary-two" />
          Error Logs
        </CardTitle>
        <CardDescription>Recent errors and failures for this job</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockErrorLogs.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-confirm mx-auto mb-4" />
              <h3 className="text-lg font-semibold">No Errors Found</h3>
              <p>This job is running smoothly without any errors.</p>
            </div>
          ) : (
            mockErrorLogs.map((error) => (
              <div key={error.id} className="border rounded-lg p-4 space-y-3 bg-input">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                    <div>
                      <h4 className="font-bold">{error.errorCode}</h4>
                      <p className="text-sm text-secondary-foreground">{format(error.timestamp, "PPpp")}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="rounded-xl border-white">
                      {error.errorType}
                    </Badge>
                  </div>
                </div>
                <p className="font-medium text-lg">{error.message}</p>
                {error.stack && (
                  <div className="bg-background rounded border-2 border-border p-3">
                    <p className="text-sm font-mono text-muted-foreground">{error.stack}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};