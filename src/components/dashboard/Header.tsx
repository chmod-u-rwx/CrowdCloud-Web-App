import { useAuthStore } from "@/stores/useAuthStore";

export default function Header() {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm justify-between gap-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-rubik items-center flex gap-3">
          Dashboard
        </h1>
        <p className="text-secondary-foreground">
          Welcome back, {user?.first_name} {user?.last_name}!
        </p>
      </div>
    </div>
  );
}