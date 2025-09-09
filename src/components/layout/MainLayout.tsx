import GlowBackground from "@/components/utils/GlowBackground";
import { Navbar } from "@/components/layout/Navbar";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <GlowBackground />
    </div>
  )
}
