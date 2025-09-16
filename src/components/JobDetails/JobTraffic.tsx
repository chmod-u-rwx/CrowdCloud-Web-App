import { useParams } from "react-router-dom";
import { useRequestMetrics } from "@/hooks/useRequestMetrics";
import {
  getHourlyRequestVolume,
  getHourlyResponseTime
} from "@/utils/jobTrafficAnalytics";
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
import { BarChart3 } from "lucide-react";

export default function JobTraffic() {
  const { jobId } = useParams();
  const { requests } = useRequestMetrics({ job_id: jobId });

  const hourlyData = getHourlyRequestVolume(requests);
  const responseTimeData = getHourlyResponseTime(requests);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-primary/30 p-2 rounded shadow text-md">
          <div><strong>Time:</strong> {label}</div>
          {payload.map((entry: any, idx: number) => (
            <div key={idx}>
              <strong>{entry.name}:</strong> {entry.value}
            </div>
          ))}
        </div>
      );
    }
    return null
  };

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
              <AreaChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip 
                  content={<CustomTooltip />}
                />
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
              <LineChart data={responseTimeData}>
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