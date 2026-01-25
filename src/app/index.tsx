import { AppRouter } from "@/app/routes/router";
import { Toaster } from "sonner";
import { useJobs } from "@/hooks/useJobs";
import { AppProvider } from "@/app/provider";

function App() {
  useJobs();
  return (
    <AppProvider>
      <Toaster />
      <AppRouter />
    </AppProvider>
  );
}

export default App;