import { useAnalytics } from "@/hooks/useAnalytics";
import { useJobsStore } from "@/stores/useJobsStore";
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
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { getPeriodLabel } from "@/utils/utility";
import { BriefcaseBusiness, Cpu, PhilippinePeso, PieChartIcon, Send } from "lucide-react";

export const ChartAnalytics = () => {
  const jobs = useJobsStore((state) => state.jobs);
  const { analytics, selectedPeriod } = useAnalytics({ jobs });

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
              Current status of your job requests
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
                  className="flex items-center gap-1"
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.colors }}
                  >
                    {item.value}: {item.value}
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
                  {/* Uncomment this after getting real data */}

                  {/* <defs>
                  <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFE5E8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#9C7DFF" stopOpacity={0.2}/>
                  </linearGradient>
                </defs> */}

                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="Succesful Requests"
                    stackId="1"
                    stroke="#FFE5E8"
                    fill="#9C7DFF"
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
                <AreaChart data={analytics.resourceTrend}>
                  {/* Uncomment this after getting real data */}

                  {/* <defs>
                  <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFE5E8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#9C7DFF" stopOpacity={0.2}/>
                  </linearGradient>
                </defs> */}

                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="Succesful Requests"
                    stackId="1"
                    stroke="#FFE5E8"
                    fill="#9C7DFF"
                  />
                </AreaChart>
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
                  {/* Uncomment this after getting real data */}

                  {/* <defs>
                  <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFE5E8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#9C7DFF" stopOpacity={0.2}/>
                  </linearGradient>
                </defs> */}

                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="Succesful Requests "
                    stackId="1"
                    stroke="#FFE5E8"
                    fill="#9C7DFF"
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
                {/* Uncomment this after getting real data */}

                {/* <defs>
                  <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFE5E8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#9C7DFF" stopOpacity={0.2}/>
                  </linearGradient>
                </defs> */}

                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="jobs" fill="#5388D8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Job Request Trend */}
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
