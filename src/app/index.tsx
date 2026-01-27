import { AppRouter } from "@/app/routes/router";
import { Toaster } from "sonner";
import { useJobs } from "@/hooks/useJobs";
import { AppProvider } from "@/app/provider";
import { ErrorBoundary } from "react-error-boundary";
import { MainErrorFallback } from "@/components/errors/main";

function App() {
  useJobs();
  return (
    <ErrorBoundary FallbackComponent={MainErrorFallback}>
      <AppProvider>
        <Toaster />
        <AppRouter />
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
