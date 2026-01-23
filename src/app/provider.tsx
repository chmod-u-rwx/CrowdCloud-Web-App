import React from "react"
import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { queryConfig } from "@/lib/react-query";
import { Spinner } from "@/components/ui/spinner";
import { MainErrorFallback } from "@/components/errors/main";

type AppProviderProps = {
  children: React.ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig
      })
  );

  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner className="size-8"/>
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
}