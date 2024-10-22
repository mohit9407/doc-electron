import * as yup from "yup";
import { maritalStatus, sexType } from "../../../lib/constants/patient";

export const staffValidationSchema = yup.object({
  date: yup.date().required("Date is required"),
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .max(25, "Maximum 25 characters for name"),

  mobileNumber: yup
    .string()
    .nullable()
    .matches(/^\d{10}$|^$/, "Mobile number must be exactly 10 digits"),

  age: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .nullable()
    .integer("Should be an integer")
    .required("Age is required")
    .moreThan(0, "Age should be more than 0"),
  gender: yup
    .string()
    .required("Sex is required")
    .oneOf(sexType, "Sex type is not valid"),
  weight: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .nullable()
    .test("Should be an float or integer", "Invalid value", (value) =>
      (value + "").match(/^\d*\.?\d+$/)
    )
    .required("Weight is required")
    .moreThan(0, "Weight should be more than 0"),
  maritalStatus: yup
    .string()
    .required("Marital Status is required")
    .oneOf(maritalStatus, "Marital Status is not valid"),
  menstrualHistory: yup.string().trim().max(200, "Maximum 200 Characters"),
});

export const patientSecFormValidationSchema = yup.object({
  chiefComplaints: yup
    .string()
    .trim()
    .required("Chief Complaints is required")
    .max(200, "Maximum 200 Characters"),
  allergicHistory: yup.string().trim().max(200, "Maximum 200 Characters"),
  pastTreatmentReceived: yup.string().trim().max(200, "Maximum 200 Characters"),

  examinationFindings: yup.string().trim().max(200, "Maximum 200 Characters"),

  investigationAdvice: yup.string().trim().max(200, "Maximum 200 Characters"),
});

export const patientThirdFormValidationSchema = yup.object({
  amountCharges: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .nullable()
    .test("Should be an float or integer", "Invalid value", (value) =>
      (value + "").match(/^\d*\.?\d+$/)
    )
    .required("Amount Charges is required"),
  treatment: yup.string().trim().max(200, "Maximum 200 Characters"),
});

export const resetPswdValidationSchema = yup.object({
  oldPassword: yup
    .string()
    .required("Old Password is required")
    .min(8, "Minimum 8 characters is required")
    .max(25, "Maximum 25 characters is required"),
  newPassword: yup
    .string()
    .required("New Password is required")
    .min(8, "Minimum 8 characters is required")
    .max(25, "Maximum 25 characters is required")
    .notOneOf(
      [yup.ref("oldPassword"), null],
      "New Password must not match with Old Password"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .min(8, "Minimum 8 characters is required")
    .max(25, "Maximum 25 characters is required")
    .oneOf(
      [yup.ref("newPassword"), null],
      "Confirm Password does't match with New Password"
    ),
});
