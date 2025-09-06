import * as yup from "yup";

export const jobCreateSchema = yup.object().shape({
  jobName: yup.string().required("Job Name is required"),
  jobURL: yup.string().url("Must be a valid URL").required("Job URL is required"),
  jobDescription: yup.string().required("Description is required"),
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