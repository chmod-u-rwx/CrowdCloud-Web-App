import { TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const StatsCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  color?: string;
}) => {
  return (
    <Card className="shadow shadow-accent-shadow border-0 bg-secondary backdrop-blur-sm">
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="font-medium text-secondary-foreground">{title}</p>
            <p className="text-3xl font-semibold">{value}</p>
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
            {trend && trendValue && (
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
            )}
          </div>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};