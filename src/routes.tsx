import JobLayout from "@/components/layout/JobLayout";
import NotFound from "@/pages/NotFound";
import JobPage from "@/pages/JobPage";

export const routes = [
  {
    element: <JobLayout />,
    children: [
      // { index: true, element: <JobPage /> },
      { path: "/dashboard/jobs", element: <JobPage /> },
    ],
  },
  // { path: "/dashboard/jobs", element: <JobPage /> },
  { path: "*", element: <NotFound /> },
]