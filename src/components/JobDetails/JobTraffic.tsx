import { useParams } from "react-router-dom";
import { useJobsStore } from "@/stores/useJobsStore";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { 
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import useMockLogs from "@/mock/mock-logs";
import { BarChart3 } from "lucide-react";

export default function JobTraffic() {
  const { jobId } = useParams();
  const jobs = useJobsStore((state) => state.jobs);
  const job = jobs.find((j) => j.job_id === jobId);

  const { mockTrafficData } = useMockLogs(job);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
      <Card className="shadow shadow-accent-shadow border-0 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-rubik text-xl">
            <BarChart3 className="w-5 h-5 text-primary-two" />
            Request Volume (24h)
          </CardTitle>
          <CardDescription>Hourly request traffic for this job</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockTrafficData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone"
                  dataKey="successfulRequest"
                  stackId="1"
                  stroke="#28E044"
                  fill="#D1FAE5"
                  name="Successful"
                />
                <Area 
                  type="monotone"
                  dataKey="failedRequest"
                  stackId="1"
                  stroke="#EF4444"
                  fill="#FEE2E2"
                  name="Successful"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow shadow-accent-shadow border-0 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-rubik text-xl">
            <BarChart3 className="w-5 h-5 text-primary-two" />
            Response Time (24h)
          </CardTitle>
          <CardDescription>Average response time per hour</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockTrafficData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}ms`, "Response Time"]}/>
                <Line 
                  type="monotone"
                  dataKey="avgResponseTime"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};