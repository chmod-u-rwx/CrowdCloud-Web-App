import type { AuthButton, DashboardItem, NavItem } from "@/types";
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

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/feature" },
  { label: "About Us", href: "/about-us" },
  { label: "Download CrowdCloud", href: "/download" },
]

export const AUTH_BUTTONS: AuthButton[] = [
  { label: "Log In", href: "/login", variant: "outline" },
  { label: "Sign Up", href: "/signup", variant: "default" },
];