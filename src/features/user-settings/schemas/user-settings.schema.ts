import { PASSWORD_REGEX } from "@/app/constants/user-input";
import z from "zod";

export const profileUpdateInputSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  username: z.string().min(1, "Username is required"),
  company_name: z.string().min(1, "Company name is required"),
  company_address: z.string().min(1, "Company address is required"),
});

export const accountUpdateInputSchema = z.object({
  email: z.email("Enter a valid email address").min(1, "Email is required"),
  password: z
    .string()
    .regex(PASSWORD_REGEX, "Enter a secure password")
    .min(8, "Password is required"),
  confirm_password: z.string().min(8, "Confirm your password"),
  new_password: z
  .string()
  .regex(PASSWORD_REGEX, "Enter a secure password")
  .min(8, "Enter a new password"),
}).refine((data) => data.password === data.confirm_password, {
  error: "Password must match",
  path: ["confirm_password"],
});

export type ProfileUpdateInput = z.infer<typeof profileUpdateInputSchema>;
export type AccountUpdateInput = z.infer<typeof accountUpdateInputSchema>;