import { useAuthStore } from "@/stores/useAuthStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ProfileForm } from "@/components/UserSetting/ProfileForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Save, Shield } from "lucide-react";

export default function UserProfile() {
  const user = useAuthStore((state) => state.user);

  return (
    <Card className="shadow border-0 bg-secondary backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl">User Profile</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </div>

          <div className="flex items-center">
            <Button>
              <Save className="w-4 h-4 mr-2" />
              Save Profile
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <ProfileForm />

        {/* Badge and Alert at the Lower */}
        {user?.role === "company" ? (
          <div className="space-y-4 my-4">
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <p className="font-semibold">Account Type</p>
                <p className="text-muted-foreground text-sm">
                  Choose whether you’re an individual or represent a company
                </p>
              </div>
              <Badge className="rounded-full">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </Badge>
            </div>
            <Alert className="my-4 bg-violet-200 border-primary">
              <AlertDescription className="text-primary">
                <div className="flex items-center">
                  <Shield className="text-primary w-4 h-4 mr-2 hidden md:block" />
                  Your account is registered as{" "}
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)} and
                  cannot be changed to Individual type
                </div>
              </AlertDescription>
            </Alert>
          </div>
        ) : user?.role === "individual" ? (
          <div className="space-y-4 my-4">
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <p className="font-semibold">Account Type</p>
                <p className="text-muted-foreground text-sm">
                  Choose whether you’re an individual or represent a company
                </p>
              </div>
              <Badge className="rounded-full">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </Badge>
            </div>
            <Alert className="my-4 bg-violet-200 border-primary">
              <AlertDescription className="text-primary">
                <div className="flex items-center">
                  <Shield className="text-primary w-4 h-4 mr-2 hidden md:block" />
                  Your account is registered as{" "}
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)} and
                  cannot be changed to Individual type
                </div>
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <></>
        )}
      </CardContent>
    </Card>
  );
}