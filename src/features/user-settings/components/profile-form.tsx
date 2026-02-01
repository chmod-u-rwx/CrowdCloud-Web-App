import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileUpdateInputSchema,
  type ProfileUpdateInput
} from "@/features/user-settings/schemas/user-settings.schema";
import { useAuthStore } from "@/stores/useAuthStore";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const ProfileForm = () => {
  const user = useAuthStore((state) => state.user);

  const {
    register,
    formState: { errors },
    reset,
  } = useForm<ProfileUpdateInput>({
    resolver: zodResolver(profileUpdateInputSchema),
    defaultValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      username: user?.username || "",
      company_name: user?.company_name || "",
      company_address: user?.company_address || "",
    },
  });

  useEffect(() => {
    if(user) {
      reset({
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username
      });
    }
  }, [user, reset]);

  return (
    <>
      <form className="space-y-4">
        {user?.role === "individual" ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  {...register("first_name")}
                  placeholder="Enter your First Name"
                  className={`bg-input border-2 ${
                    errors.first_name ? "border-destructive" : ""
                  }`}
                />
                {errors.first_name && (
                  <span className="text-sm text-destructive">
                    {errors.first_name.message}
                  </span>
                )}
              </div>
              <div className="space-y-4">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  {...register("last_name")}
                  placeholder="Enter your Last Name"
                  className={`bg-input border-2 ${
                    errors.last_name ? "border-destructive" : ""
                  }`}
                />
                {errors.last_name && (
                  <span className="text-sm text-destructive">
                    {errors.last_name.message}
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                {...register("username")}
                placeholder="Enter username"
                className={`bg-input border-2 ${
                  errors.username ? "border-destructive" : ""
                }`}
              />
              <span className="text-muted-foreground">
                This will be your unique identifier for CrowdCloud
              </span>
              {errors.username && (
                <span className="text-sm text-destructive">
                  {errors.username.message}
                </span>
              )}
            </div>
          </>
        ) : user?.role === "company" ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  {...register("first_name")}
                  placeholder="Enter your First Name"
                  className={`bg-input border-2 ${
                    errors.first_name ? "border-destructive" : ""
                  }`}
                />
                {errors.first_name && (
                  <span className="text-sm text-destructive">
                    {errors.first_name.message}
                  </span>
                )}
              </div>
              <div className="space-y-4">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  {...register("last_name")}
                  placeholder="Enter your Last Name"
                  className={`bg-input border-2 ${
                    errors.last_name ? "border-destructive" : ""
                  }`}
                />
                {errors.last_name && (
                  <span className="text-sm text-destructive">
                    {errors.last_name.message}
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                {...register("username")}
                placeholder="Enter your User Name"
                className={`bg-input border-2 ${
                  errors.username ? "border-destructive" : ""
                }`}
              />
              <span className="text-muted-foreground">
                This will be your unique identifier for CrowdCloud
              </span>
              {errors.username && (
                <span className="text-sm text-destructive">
                  {errors.username.message}
                </span>
              )}
            </div>
            <div className="space-y-4">
              <Label htmlFor="company_name">Company Name</Label>
              <Input
                id="company_name"
                {...register("company_name")}
                placeholder="Enter Company Name"
                className={`bg-input border-2 ${
                  errors.company_name ? "border-destructive" : ""
                }`}
              />
              {errors.company_name && (
                <span className="text-sm text-destructive">
                  {errors.company_name.message}
                </span>
              )}
            </div>
            <div className="space-y-4">
              <Label htmlFor="company_address">Company Address</Label>
              <Input
                id="company_address"
                {...register("company_address")}
                placeholder="Enter Company Address"
                className={`bg-input border-2 ${
                  errors.company_address ? "border-destructive" : ""
                }`}
              />
              {errors.company_address && (
                <span className="text-sm text-destructive">
                  {errors.company_address.message}
                </span>
              )}
            </div>
          </>
        ) : (
          <></>
        )}
      </form>
    </>
  );
};