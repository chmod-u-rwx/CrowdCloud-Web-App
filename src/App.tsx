import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { routes } from "@/routes";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "sonner";
import { useJobs } from "./hooks/useJobs";

const router = createBrowserRouter(routes)

function App() {
  useJobs(); //For mock data, removed after
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;