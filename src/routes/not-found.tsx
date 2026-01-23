import { Button } from "@/components/ui/button";
import GlowBackground from "@/components/utils/GlowBackground";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <GlowBackground />
      <div className="container px-4 mx-auto py-4 md:py-6">
        <main className="flex-1 flex items-center justify-center">
          <div className="container px-4 md:px-6 py-16 flex flex-col items-center text-center z-2">
            <h1 className="text-8xl font-bold mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-secondary-foreground mb-2">
              Page Not Found
            </h2>
            <p className="text-muted-foreground mb-8">
              The page you're looking for doesn't exist or may have been moved.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link to="/" className="font-normal">
                  Back to Home
                </Link>
              </Button>

              <Button variant="outline" onClick={() => window.history.back()}>
                Go Back
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
