import { useMemo } from "react";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { paths } from "@/config/paths";
import { JobAnalytics } from "@/pages/JobAnalytics";
import { JobDetail } from "@/pages/JobDetail";
import { Signup } from "@/pages/Signup";
import MainLayout from "@/components/layouts/MainLayout";
import JobLayout from "@/components/layouts/JobLayout";
import Dashboard from "@/components/layouts/dashboard-layout";
import NotFound from "@/routes/not-found";
import JobPage from "@/pages/JobPage";
import Login from "@/pages/Login";
import LandingPage from "@/routes/landing";
import UserSettings from "@/pages/UserSettings";

const convert = (queryClient: QueryClient) => (m: any) => {
  const { clientLoader, clientAction, default: Component, ...rest } = m;
  return {
    ...rest,
    loader: clientLoader?.(queryClient),
    action: clientAction?.(queryClient),
    Component,
  };
};

export const createRouter = (queryClient: QueryClient) => 
  createBrowserRouter([
    {
      path: paths.home.path,
      lazy: () => import("@/routes/landing").then(convert(queryClient)),
    }
  ]);

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

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};
