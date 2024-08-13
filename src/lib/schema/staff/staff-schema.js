import * as yup from "yup";
import { maritalStatus, sexType } from "@/lib/constants/patient";

export const staffValidationSchema = yup.object({
  date: yup.date().required("Date is required"),
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .max(25, "Maximum 25 characters for name"),

  mobileNumber: yup
    .string()
    .required("Mobile Required")
    .length(10, "Must be 10 digits")
    .transform((_value) => (isNaN(_value) ? undefined : _value))
    .typeError("Mobile number should be all digits"),

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
