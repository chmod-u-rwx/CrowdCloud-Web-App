import JobLayout from "@/components/layout/JobLayout";
import NotFound from "@/pages/NotFound";
import JobPage from "@/pages/JobPage";
import { JobDetail } from "@/pages/JobDetail";
import { Signup } from "@/pages/Signup";

export const routes = [
  {
    element: <JobLayout />,
    children: [
      // { index: true, element: <JobPage /> },
      { path: "/dashboard/jobs", element: <JobPage /> },
    ],
  },
  { path: "/dashboard/jobs/:jobId", element: <JobDetail /> },
  { path: "/signup", element: <Signup /> },
  { path: "*", element: <NotFound /> },
]