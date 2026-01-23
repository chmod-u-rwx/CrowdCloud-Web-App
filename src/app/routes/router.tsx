import { useMemo } from "react";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { paths } from "@/config/paths";
import { JobAnalytics } from "@/pages/JobAnalytics";
import { JobDetail } from "@/pages/JobDetail";
import { Signup } from "@/app/routes/auth/signup";
import MainLayout from "@/components/layouts/MainLayout";
import JobLayout from "@/components/layouts/JobLayout";
import Dashboard from "@/components/layouts/dashboard-layout";
import NotFound from "@/app/routes/not-found";
import JobPage from "@/pages/JobPage";
import Login from "@/app/routes/auth/login";
import LandingPage from "@/app/routes/landing";
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

export const createCrowdCloudRouter = (queryClient: QueryClient) => 
  createBrowserRouter([
    {
      path: paths.home.path,
      lazy: () => import("@/app/routes/landing").then(convert(queryClient)),
    },
    {
      path: paths.auth.signup.path,
      lazy: () => import("@/app/routes/auth/signup").then(convert(queryClient)),
    },
    {
      path: paths.auth.login.path,
      lazy: () => import("@/app/routes/auth/login").then(convert(queryClient)),
    },
    {
      path: '*',
      lazy: () => import('@/app/routes/not-found').then(convert(queryClient)),
    },
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
  const router = useMemo(() => createCrowdCloudRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};
