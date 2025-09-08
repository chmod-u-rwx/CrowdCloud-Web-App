import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import type { LoginCredentials } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/schema/schemas";
import { loginUser } from "@/services/api";
import { useAuthStore } from "@/stores/useAuthStore";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginCredentials>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data: LoginCredentials) => {
    try {
      const authResponse = await loginUser(data);
      useAuthStore.getState().setUser(authResponse);
      console.log("Login data:", data);
      reset();
      navigate("/dashboard/jobs")
    } catch (error) {
      console.error(error);
    }
  };

  const [rememberMe, setRememberMe] = useState<boolean>(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          required
          placeholder="example@email.com"
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
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link
            to="/forgot-password"
            className="text-sm text-primary-two hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <Input
          type="password"
          id="password"
          {...register("password")}
          required
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
      <div className="flex items-center space-x-2">
        <Checkbox
          id="remember"
          checked={rememberMe}
          onCheckedChange={(checked) => {
            setRememberMe(checked === true);
          }}
          className="bg-input border-border"
        />
        <Label
          htmlFor="remember"
          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Remember Me
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Log in"}
      </Button>
    </form>
  );
};
