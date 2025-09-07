import JobLayout from "@/components/layout/JobLayout";
import NotFound from "@/pages/NotFound";
import JobPage from "@/pages/JobPage";
import Login from "@/pages/Login";
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
  { path: "/login", element: <Login/> },
  { path: "*", element: <NotFound /> },
]