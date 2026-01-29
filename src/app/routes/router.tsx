import { useMemo } from "react";
import { 
  QueryClient,
  useQueryClient
} from "@tanstack/react-query";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { paths } from "@/config/paths";
import { ProtectedRoute } from "@/services/routes/auth";
import MainLayout from "@/components/layouts/MainLayout";
import JobLayout, {
  ErrorBoundary as JobLayoutErrorBoundary
} from "@/components/layouts/JobLayout";

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
      element: <MainLayout />,
      children: [
        {
          index: true,
          lazy: () => import("@/app/routes/landing").then(convert(queryClient)),
        }
      ],
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
      path: paths.app.dashboard.path,
      element: (
        <ProtectedRoute>
          <JobLayout />
        </ProtectedRoute>
      ),
      ErrorBoundary: JobLayoutErrorBoundary,
      children: [
        {
          index: true,
          path: paths.app.dashboard.path,
          lazy: () => import("@/app/routes/dashboard/dashboard").then(convert(queryClient)),
        },
        {
          path: paths.app.jobs.path,
          lazy: () => import("@/app/routes/dashboard/jobs").then(convert(queryClient)),
        },
        {
          path: paths.app.analytics.path,
          lazy: () => import("@/app/routes/dashboard/analytics").then(convert(queryClient)),
        },
        {
          path: paths.app.settings.path,
          lazy: () => import("@/app/routes/dashboard/user-settings").then(convert(queryClient)),
        }
      ]
    },
    {
      path: paths.app.job.path,
      lazy: () => import("@/app/routes/dashboard/job-detail").then(convert(queryClient)),
    },
    {
      path: '*',
      lazy: () => import('@/app/routes/not-found').then(convert(queryClient)),
    },
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();
  const router = useMemo(() => createCrowdCloudRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};
