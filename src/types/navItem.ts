import type { AuthButton, DashboardItem, NavItem } from "@/types";
import { BriefcaseBusiness, ChartLine, LayoutDashboard } from "lucide-react";

export const DASHBOARD_ITEM: DashboardItem[] = [
  // {
  //   title: "Home",
  //   href: "/",
  //   icon: Home,
  // },
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

export const NAV_ITEMS: NavItem[] = [
  { id: "hero", label: "Home" },
  { id: "features", label: "Features" },
  { id: "about", label: "About Us"},
  { id: "download", label: "Download" },
]

export const AUTH_BUTTONS: AuthButton[] = [
  { label: "Log In", href: "/login", variant: "outline" },
  { label: "Sign Up", href: "/signup", variant: "default" },
];