import { useAnalytics } from "@/hooks/useAnalytics";
import { useJobsStore } from "@/stores/useJobsStore";
import { useAnalyticsStore } from "@/stores/useAnalyticsStore";
import { getPeriodLabel } from "@/utils/utility";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  BriefcaseBusiness,
  Cpu,
  PhilippinePeso,
  PieChartIcon,
  Send
} from "lucide-react";

export const ChartAnalytics = () => {
  const jobs = useJobsStore((state) => state.jobs);
  const selectedPeriod = useAnalyticsStore((state) => state.selectedPeriod);
  const { analytics } = useAnalytics({ jobs });

  // Custom Tooltip for Cost Analysis
  const CostTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-primary/30 p-2 rounded shadow text-md">
          <div><strong>Date:</strong> {label}</div>
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
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Job Status Distribution */}
        <Card className="shadow border-0 bg-secondary backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-rubik">
              <PieChartIcon className="w-5 h-5 text-primary-two" />
              Job Request Status
            </CardTitle>
            <CardDescription>
              Current status of your job requests - {getPeriodLabel(selectedPeriod)}
            </CardDescription>
          </CardHeader>

          {/* Job Status Distribution */}
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analytics.statusDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {analytics.statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.colors} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {analytics.statusDistribution.map((item, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="flex items-center gap-1 rounded-full"
                  style={{ backgroundColor: item.colors }}
                >
                  <div
                    className="font-semibold"
                  >
                    {item.name}: {item.value}
                  </div>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Traffic Trend */}
        <Card className="shadow border-0 bg-secondary backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-rubik">
              <Send className="w-5 h-5 text-primary-two" />
              Request Traffic
            </CardTitle>
            <CardDescription>
              API requests over time - {getPeriodLabel(selectedPeriod)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics.trafficTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    content={<CustomTooltip />}
                  />
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
          </CardContent>
        </Card>

        {/* Resource Request Trend */}
        <Card className="shadow border-0 bg-secondary backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-rubik">
              <Cpu className="w-5 h-5 text-primary-two" />
              Resource Requeset Trend
            </CardTitle>
            <CardDescription>
              CPU and RAM requests over time - {getPeriodLabel(selectedPeriod)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics.resourceTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    content={<CustomTooltip />}
                  />
                  <Line
                    type="monotone"
                    dataKey="CPU Cores Requested"
                    stroke="#00F6FF"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="RAM (GB) Requested"
                    stroke="#F4BE37"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Cost Analysis */}
        <Card className="shadow border-0 bg-secondary backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-rubik">
              <PhilippinePeso className="w-5 h-5 text-primary-two" />
              Cost Analysis
            </CardTitle>
            <CardDescription>
              Your compute costs - {getPeriodLabel(selectedPeriod)}
            </CardDescription>
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
                    formatter={( value: number ) => [`₱${value.toFixed(2)}`, ""]}
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

      {/* Job Request Trend */}
      <Card className="shadow border-0 bg-secondary backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-rubik">
            <BriefcaseBusiness className="w-5 h-5 text-primary-two" />
            Job Request Trend
          </CardTitle>
          <CardDescription>
            Job requests submitted over time - {getPeriodLabel(selectedPeriod)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  content={<CustomTooltip />}
                />
                <Bar dataKey="jobs" fill="#3A86FFC5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Statistics */}
      <Card className="shadow border-0 bg-secondary backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-rubik">
            Detailed Statistics
          </CardTitle>
          <CardDescription>
            Comprehensive breakdown of your resource requests and traffic patterns for the {getPeriodLabel(selectedPeriod).toLowerCase()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Job Statistics */}
            <div className="space-y-2">
              <div className="font-semibold text-lg">Job Statistics</div>
              <div className="space-y-1 text-md">
                <div className="flex justify-between">
                  <span className="text-secondary-foreground">Total Jobs:</span>
                  <span className="font-bold">{analytics.basicJobStats.totalJobs}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-secondary-foreground">Selected Period:</span>
                  <span className="font-bold">{analytics.basicJobStats.totalJobs}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-secondary-foreground">Jobs ({getPeriodLabel(selectedPeriod)}):</span>
                  <span className="font-bold">{analytics.jobsLast7Days}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-secondary-foreground">Success Rate:</span>
                  <span className="font-bold">{analytics.successRate.toFixed(1)}%</span>
                </div>
              </div>
            </div>
            
            {/* Resource Requests */}
            <div className="space-y-2">
              <div className="font-semibold text-lg">Resource Requests</div>
              <div className="space-y-1 text-md">
                <div className="flex justify-between">
                  <span className="text-secondary-foreground">Total CPU Requested:</span>
                  <span className="font-bold">{analytics.resourceRequests.totalCpuRequested}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-secondary-foreground">Active CPU Borrowed:</span>
                  <span className="font-bold">{analytics.resourceRequests.activeCpuUsage}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-secondary-foreground">Total RAM Requested:</span>
                  <span className="font-bold">{analytics.resourceRequests.totalRamRequested}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-secondary-foreground">Active RAM Borrowed:</span>
                  <span className="font-bold">{analytics.resourceRequests.activeRamUsage}</span>
                </div>
              </div>
            </div>
            
            {/* Traffic Costs */}
            <div className="space-y-2">
              <div className="font-semibold text-lg">Traffic & Costs</div>
              <div className="space-y-1 text-md">
                <div className="flex justify-between">
                  <span className="text-secondary-foreground">Total Requests:</span>
                  <span className="font-bold">{analytics.totalRequests}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-secondary-foreground">Request Success Rate:</span>
                  <span className="font-bold">{analytics.requestSuccessRate.toFixed(1)}%</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-secondary-foreground">Est. Monthly Cost:</span>
                  <span className="font-bold">₱{analytics.estimatedMonthlyCost.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-secondary-foreground">Currently Hour Rate:</span>
                  <span className="font-bold">₱{analytics.currentHourlyCost.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
