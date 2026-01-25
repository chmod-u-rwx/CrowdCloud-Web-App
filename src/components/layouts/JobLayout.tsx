import { Outlet } from "react-router-dom";
import DashboardNav from "@/features/borrower-dashboard/components/DashboardNav";
import GlowBackground from "@/components/utils/GlowBackground";

export const ErrorBoundary = () => {
  return(
    <div className="h-screen w-screen flex items-center justify-center">
      <h2 className="text-lg font-semibold">Something went wrong.</h2>
    </div>
  );
}

const JobLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <GlowBackground />
      <div className="flex z-2">
        <DashboardNav />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default JobLayout;