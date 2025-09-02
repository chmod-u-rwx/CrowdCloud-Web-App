import type { DashboardItem } from "@/types";
import { BriefcaseBusiness, ChartLine, Home, LayoutDashboard } from "lucide-react";

export const DASHBOARD_ITEM: DashboardItem[] = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Jobs",
    href: "/dashboard/jobs",
    icon: BriefcaseBusiness,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: ChartLine,
  },
];