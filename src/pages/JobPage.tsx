import { JobsMainContent } from "@/components/jobs/JobsMainContent"
import { JobStats } from "@/components/jobs/JobStats"

export default function JobPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-rubik">Jobs</h1>
        <p className="text-secondary-foreground text-lg">
          Create, track, and manage your compute tasks powered by our trusted worker's CPUs and RAM
        </p>
      </div>

      {/* Stats Card */}
      <JobStats />
      <JobsMainContent />
    </div>
  )
}