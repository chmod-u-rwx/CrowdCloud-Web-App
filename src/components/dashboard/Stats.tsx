import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis, 
  YAxis
} from "recharts";

import { PhilippinePeso } from "lucide-react";

export default function Stats() {

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-primary/30 p-2 rounded shadow text-md">
          <div><strong>Date:</strong> {label}</div>
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
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:gap-6">
      <Card className="shadow border-0 bg-secondary backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="font-rubik text-md md:text-xl">
            Expenses
          </CardTitle>
        </CardHeader>
      
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-4">
              <p className="text-3xl font-semibold">0</p>
              <p className="text-sm text-muted-foreground">Total Expenses</p>
              {/* {trend && trendValue && (
                <div className="flex items-center gap-1">
                  {trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-confirm" />
                  ) : trend === "down" ? (
                    <TrendingDown className="w-4 h-4 text-destructive" />
                  ) : null}
                  <span className={`text-sm font-medium ${
                    trend === "up" ? "text-confirm" : trend === "down" ? "text-destructive" : "text-secondary-foreground"
                  }`}>
                    {trendValue}
                  </span>
                </div>
              )} */}
            </div>
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
              <PhilippinePeso className="w-6 h-6" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow border-0 bg-secondary backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-md md:text-xl font-rubik">
            Failure Rate of Job
          </CardTitle>
        </CardHeader>

        {/* Failure Rate of Jobs */}
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="Successful Requests"
                  stackId="1"
                  stroke="#FF4D9E"
                  fill="#49067C"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="my-2">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-10 bg-primary-two"></div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm">Failure Rate (Count)</span>
                <span className="text-primary-three font-bold">Test</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow border-0 bg-secondary backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-md md:text-xl font-rubik">
            Traffic Metrics
          </CardTitle>
        </CardHeader>

        {/* Traffic Metrics */}
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="Successful Requests"
                  stackId="1"
                  stroke="#FF4D9E"
                  fill="#49067C"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="my-2">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-10 bg-destructive"></div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm">Number of Requests</span>
                <span className="text-primary-three font-bold">Test</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
