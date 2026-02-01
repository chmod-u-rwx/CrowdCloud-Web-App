import { PASSWORD_REGEX, PHONE_REGEX } from "@/app/constants/user-input";
import z from "zod";

export const loginInputSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(8, "Password is required")
});

export type LoginInput = z.infer<typeof loginInputSchema>;

export const registerInputSchema = z.object({
  username: z.string().min(1, "Username is required."),
  first_name: z.string().min(1, "First name is required."),
  last_name: z.string().min(1, "Last name is required."),
  email: z.email("Enter a valid email address.").min(1, "Email is required"),
  password: z
    .string()
    .regex(PASSWORD_REGEX, "Password must meet the requirements")
    .min(8, "Password is required"),
  confirm_password: z.string().min(1, "Confirm your password"),
  phone_number: z
    .string()
    .regex(PHONE_REGEX, "Please enter a valid phone number"),
  role: z.enum(["individual", "company"]),
  company_name: z.string().optional(),
  company_address: z.string().optional()
}).superRefine((data, ctx) => {
  if(data.password !== data.confirm_password) {
    ctx.addIssue({
      code: "custom",
      message: "Password must match",
      path: ["confirm_password"]
    })
  }

  if(data.role === "company") {
    if(!data.company_name) {
      ctx.addIssue({
        code: "custom",
        message: "Company name is required",
        path: ["company_name"],
      })
    }

    if(!data.company_address) {
      ctx.addIssue({
        code: "custom",
        message: "Company address is required",
        path: ["company_address"],
      })
    }
  }

  if(data.role === "individual") {
    if(data.company_name) {
      ctx.addIssue({
        code: "custom",
        message: "Company name should not be provided for users with Individual role",
        path: ["company_name"],
      })
    }

    if(data.company_address) {
      ctx.addIssue({
        code: "custom",
        message: "Company address should not be provided for users with Individual role",
        path: ["company_address"],
      })
    }
  }
});

export type RegisterInput = z.infer<typeof registerInputSchema>;