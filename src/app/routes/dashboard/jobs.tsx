import { JobMainContent } from "@/components/jobs/JobMainContent";
import { JobStats } from "@/components/jobs/JobStats";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function JobPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if(!user) {
      navigate("/login", { replace: true })
    }
  }, [user, navigate])

  if(!user) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-rubik">Jobs</h1>
        <p className="text-secondary-foreground text-lg">
          Create, track, and manage your compute tasks powered by our trusted worker's CPUs and RAM
        </p>
      </div>

      {/* Main Contents */}
      <JobStats />
      <JobMainContent />
    </div>
  );
};