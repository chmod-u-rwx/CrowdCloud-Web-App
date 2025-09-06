import type { CompanyUserCredentials } from "@/types";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { companyUserSchema } from "@/schema/schemas";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

type CompanySignupFormData = Omit<CompanyUserCredentials, "userId">;

export const CompanySignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CompanySignupFormData>({
    resolver: yupResolver(companyUserSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      companyName: "",
      companyAddress: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      role: "company",
    },
  });

  const onSubmit = (data: CompanyUserCredentials) => {
    // Logic for sign up
    console.log("Sign up data:", data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">
            First Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="firstName"
            {...register("firstName")}
            placeholder="Juan"
            className={`bg-input border-2 ${
              errors.firstName ? "border-destructive" : ""
            }`}
            required
          />
          {errors.firstName && (
            <span className="text-sm text-destructive">
              {errors.firstName.message}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">
            Last Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="lastName"
            {...register("lastName")}
            placeholder="Dela Cruz"
            className={`bg-input border-2 ${
              errors.lastName ? "border-destructive" : ""
            }`}
            required
          />
          {errors.lastName && (
            <span className="text-sm text-destructive">
              {errors.lastName.message}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">
            Username <span className="text-destructive">*</span>
          </Label>
          <Input
            id="username"
            {...register("username")}
            placeholder="Enter a username"
            className={`bg-input border-2 ${
              errors.username ? "border-destructive" : ""
            }`}
            required
          />
          {errors.username && (
            <span className="text-sm text-destructive">
              {errors.username.message}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber">
            Contact Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phoneNumber"
            {...register("phoneNumber")}
            placeholder="+639123456789"
            className={`bg-input border-2 ${
              errors.phoneNumber ? "border-destructive" : ""
            }`}
            required
          />
          {errors.phoneNumber && (
            <span className="text-sm text-destructive">
              {errors.phoneNumber.message}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">
            Company Email Address <span className="text-destructive">*</span>
          </Label>
          <Input
            type="email"
            id="email"
            {...register("email")}
            placeholder="example@email.com"
            className={`bg-input border-2 ${
              errors.email ? "border-destructive" : ""
            }`}
            required
          />
          {errors.email && (
            <span className="text-sm text-destructive">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="companyName">
            Company Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="companyName"
            {...register("companyName")}
            placeholder="Computer Solution Inc."
            className={`bg-input border-2 ${
              errors.companyName ? "border-destructive" : ""
            }`}
            required
          />
          {errors.companyName && (
            <span className="text-sm text-destructive">
              {errors.companyName.message}
            </span>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="companyAddress">
          Company Address <span className="text-destructive">*</span>
        </Label>
        <Input
          id="companyAddress"
          {...register("companyAddress")}
          placeholder="Enter your company address"
          className={`bg-input border-2 ${
            errors.companyAddress ? "border-destructive" : ""
          }`}
          required
        />
        {errors.companyAddress && (
          <span className="text-sm text-destructive">
            {errors.companyAddress.message}
          </span>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="password">
            Password <span className="text-destructive">*</span>
          </Label>
          <Input
            type="password"
            id="password"
            {...register("password")}
            placeholder="Enter a password"
            className={`bg-input border-2 ${
              errors.password ? "border-destructive" : ""
            }`}
            required
          />
          {errors.password && (
            <span className="text-sm text-destructive">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">
            Confirm Password <span className="text-destructive">*</span>
          </Label>
          <Input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword")}
            placeholder="Confirm Password"
            className={`bg-input border-2 ${
              errors.confirmPassword ? "border-destructive" : ""
            }`}
            required
          />
          {errors.confirmPassword && (
            <span className="text-sm text-destructive">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full mb-2" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Signing up...
          </>
        ) : (
          <>Sign Up</>
        )}
      </Button>
    </form>
  );
};
