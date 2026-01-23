import GlowBackground from "@/components/utils/GlowBackground";
import { Navbar } from "@/components/layouts/navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <GlowBackground />
      <div className="z-2">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
