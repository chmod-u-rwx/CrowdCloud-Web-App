import { createMockJobs } from "@/mock/mock-data"
import { Card, CardContent } from "@/components/ui/card"

export default function JobStats() {
  const stats = {
    
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-b from-background to-accent-cyan border-0">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary-foreground font-rubik">Total Jobs</p>

            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
