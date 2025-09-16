import SideMenuLogo from "@/components/utils/SideMenuLogo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DASHBOARD_ITEM } from "@/types/navItem";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";

export default function DashboardNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const user = useAuthStore((state) => state.user);

  const avatarFallback = user
    ? `${user.first_name?.[0] ?? ""}${user.last_name?.[0] ?? ""}`.toUpperCase()
    : "U";
  const fullName = user
    ? `${user.first_name} ${user.last_name}`
    : "Guest";
  const email = user?.email ?? "";

  const handleLogout = () => {
    useAuthStore.getState().logout()
    navigate("/", { replace: true });
    window.location.reload();
  }

  return (
    <div className="hidden w-64 bg-sidebar border-gradient min-h-screen lg:flex flex-col fixed top-0 left-0 ">
      <div className="px-6 py-5 border-b border-primary">
        <SideMenuLogo />
      </div>

      <ScrollArea className="flex-1">
        <div className="px-3 py-4">
          <div className="flex items-center px-3 py-2 mb-2">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage
                src="https://randomuser.me/api/portraits/lego/1.jpg"
                alt={fullName}
              />
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>

            <div className="space-y-1">
              <div className="font-medium">{fullName}</div>
              <div className="text-sm text-secondary-foreground">{email}</div>
            </div>
          </div>
        </div>

        <div className="mb-2">
          <div className="px-4 mb-2 text-xs font-medium text-secondary-foreground font-rubik">
            MENU
          </div>

          <nav className="space-y-1 px-4">
            {DASHBOARD_ITEM.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                onClick={() => {
                  if (path === item.href) {
                    window.location.reload();
                  }
                }}
                className={cn(
                  "flex items-center px-3 py-2 rounded text-sm transition-colors",
                  path === item.href
                    ? "bg-primary text-foreground"
                    : "text-foreground hover:bg-primary"
                )}
              >
                <item.icon className="mr-3 w-4 h-4" />
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-6">
          <div className="px-4 mb-2 text-xs font-medium text-secondary-foreground font-rubik">
            ACCOUNT
          </div>

          <nav className="space-y-1 px-4">
            <Link
              to="/dashboard/user-settings"
              className={cn(
                "flex items-center px-3 py-2 rounded text-sm transition-colors",
                path === "Settings"
                  ? "bg-primary text-foreground"
                  : "text-foreground hover:bg-primary"
              )}
            >
              <Settings className="mr-3 w-4 h-4" />
              <span>Settings</span>
            </Link>

            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start text-destructive hover:text-destructive/80 hover:bg-destructive/10"
            >
              <LogOut className="mr-3 h-4 w-4" />
              Log Out
            </Button>
          </nav>
        </div>
      </ScrollArea>
    </div>
  );
}