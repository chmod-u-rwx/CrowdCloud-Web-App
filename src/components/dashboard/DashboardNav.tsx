import SideMenuLogo from "@/components/utils/SideMenuLogo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DASHBOARD_ITEM } from "@/types/navItem";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardNav() {
  const location = useLocation();
  const path = location.pathname;

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
                src="https://randomuser.me/api/portraits/women/81.jpg"
                alt=""
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>

            <div className="space-y-0.5">
              <div className="font-medium">Juan Dela Cruz</div>
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