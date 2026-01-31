// import { accountUpdateSchema } from "@/schema/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  accountUpdateInputSchema,
  type AccountUpdateInput
} from "@/features/user-settings/schemas/user-settings.schema";
import { useAuthStore } from "@/stores/useAuthStore";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Save, Shield } from "lucide-react";

export const AccountForm = () => {
  const user = useAuthStore((state) => state.user);

  const {
    register,
    formState: { errors },
  } = useForm<AccountUpdateInput>({
    resolver: zodResolver(accountUpdateInputSchema),
    defaultValues: {
      email: user?.email || "",
      password: "",
      confirm_password: "",
      new_password: "",
    },
  });

  return (
    <form className="space-y-6">
      <div className="space-y-4">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="Enter an Email Address"
          className={`bg-input border-2 ${
            errors.email ? "border-destructive" : ""
          }`}
        />
        {errors.email && (
          <span className="text-sm text-destructive">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="space-y-4">
        <Label htmlFor="password">Current Password</Label>
        <Input
          id="password"
          type="password"
          {...register("password")}
          placeholder="Enter your password"
          className={`bg-input border-2 ${
            errors.password ? "border-destructive" : ""
          }`}
        />
        {errors.password && (
          <span className="text-sm text-destructive">
            {errors.password.message}
          </span>
        )}
      </div>

      <div className="space-y-4">
        <Label htmlFor="confirm_password">Confirm Password</Label>
        <Input
          id="confirm_password"
          type="password"
          {...register("confirm_password")}
          placeholder="Re-enter your password"
          className={`bg-input border-2 ${
            errors.confirm_password ? "border-destructive" : ""
          }`}
        />
        {errors.confirm_password && (
          <span className="text-sm text-destructive">
            {errors.confirm_password.message}
          </span>
        )}
      </div>

      <div className="space-y-4">
        <Label htmlFor="new_password">New Password</Label>
        <Input
          id="new_password"
          type="password"
          {...register("new_password")}
          placeholder="Enter a new password"
          className={`bg-input border-2 ${
            errors.new_password ? "border-destructive" : ""
          }`}
        />
        {errors.new_password && (
          <span className="text-sm text-destructive">
            {errors.new_password.message}
          </span>
        )}
      </div>

      <div className="my-4 space-y-2">
        <Alert className="my-6 bg-violet-200 border-primary">
          <AlertDescription className="text-primary">
            <div className="flex items-center">
              <Shield className="text-primary w-4 h-4 mr-2 hidden md:block" />
              Password must be at least 8 characters long and contain uppercase,
              lowercase, numbers, and special characters.
            </div>
          </AlertDescription>
        </Alert>
      </div>

      <div className="flex items-center justify-end">
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Update Account
        </Button>
      </div>
    </form>
  );
};
