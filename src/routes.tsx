import MainLayout from "@/components/layout/MainLayout";
import JobLayout from "@/components/layout/JobLayout";
import NotFound from "@/pages/NotFound";
import JobPage from "@/pages/JobPage";
import Login from "@/pages/Login";
import { JobAnalytics } from "@/pages/JobAnalytics";
import { JobDetail } from "@/pages/JobDetail";
import { Signup } from "@/pages/Signup";
import LandingPage from "@/pages/LandingPage";
import Dashboard from "@/pages/Dashboard";
import UserSettings from "@/pages/UserSettings";

export const routes = [
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <LandingPage /> }
    ]
  },
  {
    element: <JobLayout />,
    children: [
      { index: true, path: "/dashboard", element: <Dashboard /> },
      { path: "/dashboard/jobs", element: <JobPage /> },
      { path: "/dashboard/analytics", element: <JobAnalytics /> },
      { path: "/dashboard/user-settings", element: <UserSettings /> }
    ],
  },
  { path: "/dashboard/jobs/:jobId", element: <JobDetail /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login/> },
  { path: "*", element: <NotFound /> },
]