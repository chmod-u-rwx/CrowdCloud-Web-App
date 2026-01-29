import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "@/schema/schemas";
import { Button } from "@/components/ui/button";
import { signupUser } from "@/services/routes/auth";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

type IndividualSignupFormData = {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  confirm_password: string;
  role: "individual";
};

export const IndividualSignupForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IndividualSignupFormData>({
    resolver: yupResolver(userSchema),
    defaultValues: {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      password: "",
      confirm_password: "",
      role: "individual",
    },
  });

  const onSubmit = async (data: IndividualSignupFormData) => {
    try {
      await signupUser(data);
      reset();
      navigate("/login", { replace: true })
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first_name">
            First Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="first_name"
            {...register("first_name")}
            placeholder="Juan"
            className={`bg-input border-2 ${
              errors.first_name ? "border-destructive" : ""
            }`}
            required
          />
          {errors.first_name && (
            <span className="text-sm text-destructive">
              {errors.first_name.message}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="last_name">
            Last Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="last_name"
            {...register("last_name")}
            placeholder="Dela Cruz"
            className={`bg-input border-2 ${
              errors.last_name ? "border-destructive" : ""
            }`}
            required
          />
          {errors.last_name && (
            <span className="text-sm text-destructive">
              {errors.last_name.message}
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
          <Label htmlFor="phone_number">
            Contact Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone_number"
            {...register("phone_number")}
            placeholder="+639123456789"
            className={`bg-input border-2 ${
              errors.phone_number ? "border-destructive" : ""
            }`}
            required
          />
          {errors.phone_number && (
            <span className="text-sm text-destructive">
              {errors.phone_number.message}
            </span>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">
          Email Address <span className="text-destructive">*</span>
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
          <Label htmlFor="confirm_password">
            Confirm Password <span className="text-destructive">*</span>
          </Label>
          <Input
            type="password"
            id="confirm_password"
            {...register("confirm_password")}
            placeholder="Confirm Password"
            className={`bg-input border-2 ${
              errors.confirm_password ? "border-destructive" : ""
            }`}
            required
          />
          {errors.confirm_password && (
            <span className="text-sm text-destructive">
              {errors.confirm_password.message}
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
