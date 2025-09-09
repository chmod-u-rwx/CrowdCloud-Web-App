import { AUTH_BUTTONS, NAV_ITEMS } from "@/types/navItem";
import SideMenuLogo from "../utils/SideMenuLogo";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const Navbar = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    useAuthStore.getState().logout();
    navigate("/", { replace: true });
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b">
      <div className="container mx-auto flex h-20 items-center px-4">
        <div className="flex flex-1 items-center justify-between">
          <SideMenuLogo />

          {/* Desktop Navbar */}
          <nav className="hidden md:flex items-center lg:space-x-6 space-x-4">
            <div className="h-10 bg-gray-800 px-4 flex items-center rounded-3xl space-x-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-sm font-semibold text-foreground hover:text-primary-two transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="hidden md:flex items-center md:space-x-2">
            {!user ? (
              AUTH_BUTTONS.map((button) => (
                <Button
                  key={button.href}
                  asChild
                  variant={button.variant}
                  className="rounded-3xl"
                >
                  <Link to={button.href}>{button.label}</Link>
                </Button>
              ))
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="ml-4 relative h-10 w-10 rounded-full border border-primary"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src="https://randomuser.me/api/portraits/lego/1.jpg"
                        alt={user.first_name + " " + user.last_name}
                      />
                      <AvatarFallback>
                        {user.first_name?.[0] || ""}
                        {user.last_name?.[0] || ""}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  forceMount
                  className="w-56 bg-input"
                >
                  <div className="text-sm font-semibold items-start p-2">
                    {user.first_name} {user.last_name}
                  </div>

                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      if (user && user.username) {
                        navigate(`/dashboard/jobs`);
                      }
                    }}
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
