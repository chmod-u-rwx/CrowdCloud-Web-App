import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useJobsStore } from "@/stores/useJobsStore";
import { PhilippinePeso } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function JobExpenses() {
  const jobs = useJobsStore((state) => state.jobs);
  const { analytics } = useAnalytics({ jobs });

  const CostTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-primary/30 p-2 rounded shadow text-md">
          <div>
            <strong>Date:</strong> {label}
          </div>
          {payload.map((entry: any, idx: number) => (
            <div key={idx}>
              <strong>{entry.name}:</strong> ₱{entry.value.toFixed(2)}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-2 grid grid-cols-1 gap-2">
      <Card className="shadow border-0 bg-secondary backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg text-secondary-foreground font-rubik">
            Total Expenses (MonthToday)
          </CardTitle>
        </CardHeader>

        <CardContent></CardContent>
      </Card>

      {/* Bottom Part (Transaction Cost Analysis) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="shadow border-0 bg-secondary backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-secondary-foreground font-rubik">
              Recent Transactions
            </CardTitle>
          </CardHeader>

          <CardContent></CardContent>
        </Card>
        <Card className="shadow border-0 bg-secondary backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-rubik">
              <PhilippinePeso className="w-5 h-5 text-primary-two" />
              Cost Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics.costTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip
                    content={<CostTooltip />}
                    formatter={(value: number) => [`₱${value.toFixed(2)}`, ""]}
                  />
                  <Area
                    type="monotone"
                    dataKey="Period Cost"
                    stackId="1"
                    stroke="#F4BE37"
                    fill="#FF4D9E"
                  />
                  <Area
                    type="monotone"
                    dataKey="Cumulative"
                    stackId="1"
                    stroke="#9C7DFF"
                    fill="#49067C"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};