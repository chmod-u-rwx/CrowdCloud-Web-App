import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AccountForm } from "@/features/user-settings/components/account-form";

export default function AccountProfile() {
  return (
    <Card className="shadow border-0 bg-secondary backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl">Account Security</CardTitle>
            <CardDescription>
              Update your email and password to keep your account secure.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <AccountForm />
      </CardContent>
    </Card>
  );
}
