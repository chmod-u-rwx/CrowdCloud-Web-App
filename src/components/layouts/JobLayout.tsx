import DashboardNav from "@/features/borrower-dashboard/components/DashboardNav";
import { Outlet } from "react-router-dom";
import GlowBackground from "../utils/GlowBackground";

export default function JobLayout() {
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
