import { useAnalytics } from "@/hooks/useAnalytics";
import { useJobsStore } from "@/stores/useJobsStore";
import { endOfMonth, startOfMonth } from "date-fns";
import { useTransactionHistory, useTransactionSummary } from "@/services/transactions";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PhilippinePeso } from "lucide-react";

export default function JobExpenses() {
  const jobs = useJobsStore((state) => state.jobs);
  const { analytics } = useAnalytics({ jobs });

  const now = new Date();
  const month = now.toLocaleString("default", { month: "long" });

  // Get Current Month Range
  const start_time = startOfMonth(now).toISOString();
  const end_time = endOfMonth(now).toISOString();

  const { 
    data: summary,
    isLoading: summaryLoading 
  } = useTransactionSummary({
    start_time,
    end_time,
  });

  const { 
    data: transactions,
    isLoading: historyLoading
  } = useTransactionHistory({
    start_time,
    end_time,
  });

  const paidTransactions = transactions?.filter(tx => tx.status === "paid") ?? [];
  const pendingTransactions = transactions?.filter(tx => tx.status === "pending") ?? [];

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
          <CardTitle className="text-lg text-muted-foreground font-rubik">
            Total Expenses ({month})
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="pt-0 grid grid-cols-1 md:grid-cols-4 pb-8 px-4 space-y-4">
            <div className="flex flex-col space-y-2 justify-center">
              <span className="text-4xl font-bold">
                {summaryLoading 
                  ? <Skeleton className="h-10 w-32"/>
                  : `₱${summary?.total_expenses?.toFixed(2) ?? "0"}`
                }
              </span>
              <span className="text-confirm">P15,000</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-lg text-secondary-foreground">
                Completed
              </span>
              <span className="text-xl font-semibold">
                ₱{historyLoading 
                  ? <Skeleton className="h-8 w-24"/>
                  : paidTransactions.reduce((sum, tx) => sum + tx.total_cost, 0).toFixed(2)
                }
              </span>
              <span className="text-secondary-foreground">
                45 Borrowed Resources
              </span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-lg text-secondary-foreground">
                Pending
              </span>
              <span className="text-xl font-semibold">
                ₱{historyLoading 
                  ? <Skeleton className="h-8 w-24"/>
                  : pendingTransactions.reduce((sum, tx) => sum + tx.total_cost, 0).toFixed(2)
                }
              </span>
              <span className="text-secondary-foreground">
                12 Borrowed Resources
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="text-lg text-secondary-foreground">
                Amount to be Paid
              </span>
              <span className="text-2xl font-semibold">
                ₱{historyLoading 
                  ? <Skeleton className="h-8 w-24"/>
                  : pendingTransactions.reduce((sum, tx) => sum + tx.total_cost, 0).toFixed(2)
                }
              </span>
              <Button
                size="sm"
                className="w-1/2"
              >
                Pay Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Part (Transaction Cost Analysis) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="shadow border-0 bg-secondary backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-secondary-foreground font-rubik">
              Recent Transactions
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-4 overflow-y-auto max-h-70 no-scrollwidth">
              <div className="flex items-center justify-between border-b border-primary-two space-y-2 pb-4 ">
                <div className="flex flex-col">
                  <span className="text-lg font-semibold">Payment Sent</span>
                  <span className="text-sm text-secondary-foreground">September 15, 2000</span>
                </div>
                <p className="text-confirm text-lg font-semibold">+₱1,000</p>
              </div>
            </div>
          </CardContent>
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
                    formatter={(value?: number) => [`₱${value?.toFixed(2)}`, ""]}
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