import * as yup from "yup";

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