import { Button } from "@/components/ui/button";

export const MainErrorFallback = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-lg font-semibold">Oops! Something went wrong.</h2>
      <Button 
        className="mt-4"
        onClick={() => window.location.assign(window.location.origin)}
      >
        Refresh
      </Button>
    </div>
  );
};