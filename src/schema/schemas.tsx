import * as yup from "yup";

export const jobCreateSchema = yup.object().shape({
  job_name: yup.string().required("Job Name is required"),
  repo_url: yup.string().url("Must be a valid URL").required("Job URL is required"),
  job_description: yup.string().required("Description is required"),
  cpu: yup
    .number()
    .typeError("CPU must be a number")
    .min(1, "CPU must be at least 1")
    .max(32, "CPU must not exceed 32 cores")
    .required("CPU is required"),
  ram: yup
    .number()
    .typeError("RAM must be a number")
    .min(1, "RAM must be at least 1 GB")
    .max(128, "RAM must not exceed 128 GB")
    .required("RAM is required"),
});

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&._]{8,}$/;

export const userSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  email: yup.string().email("Enter a valid email address").required("Valid email is required"),
  password: yup
    .string()
    .matches(PASSWORD_REGEX, {
      message: "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
    })
    .required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Password must match")
    .required("Confirm your password"),
  phone_number: yup
    .string()
    .matches(/^(09\d{9}|(\+639|639)\d{9})$/, "Please enter a valid PH phone number")
    .required("Phone number is required"),
  role: yup.string().oneOf(["individual"]).required(),
});

export const companyUserSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  email: yup.string().email("Enter a valid email address").required("Valid email is required"),
  company_name: yup.string().required("Comapny Name is required"),
  company_address: yup.string().required("Company Address is required"),
  password: yup
    .string()
    .matches(PASSWORD_REGEX, {
      message: "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
    })
    .required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Password must match")
    .required("Confirm your password"),
  phone_number: yup
    .string()
    .matches(/^(09\d{9}|(\+639|639)\d{9})$/, "Please enter a valid PH phone number")
    .required("Phone number is required"),
  role: yup.string().oneOf(["company"]).required(),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Enter a valid email address").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const profileUpdateSchema = yup.object().shape({
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  username: yup.string().required("Username is required"),
  company_name: yup.string().required("Company Name is required"),
  company_address: yup.string().required("Company Address is required"),
});

export const accountUpdateSchema = yup.object().shape({
  email: yup
  .string()
  .email("Enter a valid email address")
  .required("Email is required"),
  password: yup.string().required("Password is Required"),
  confirm_password: yup
  .string()
  .oneOf([yup.ref("password")], "Password must match")
  .required(""),
  new_password: yup.string().required(""),
});