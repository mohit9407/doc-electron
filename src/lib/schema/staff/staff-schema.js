import * as yup from "yup";
import { maritalStatus, sexType } from "@/lib/constants/patient";

export const staffValidationSchema = yup.object({
  date: yup.date().required("Date is required"),
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Minimum 3 Characters for name")
    .max(25, "Maximum 25 characters for name"),
  age: yup
    .number()
    .integer("Should be an integer")
    .required("Age is required")
    .moreThan(0, "Age should be more than 0"),
  gender: yup
    .string()
    .required("Sex is required")
    .oneOf(sexType, "Sex type is not valid"),
  weight: yup
    .number()
    .test("Should be an float or integer", "Invalid value", (value) =>
      (value + "").match(/^\d*\.?\d+$/)
    )
    .required("Weight is required")
    .moreThan(0, "Weight should be more than 0"),
  maritalStatus: yup
    .string()
    .required("Marital Status is required")
    .oneOf(maritalStatus, "Marital Status is not valid"),
  menstrualHistory: yup
    .string()
    .required("Menstrual History is required")
    .min(15, "Minimum 15 Characters")
    .max(200, "Maximum 200 Characters"),
});

export const patientSecFormValidationSchema = yup.object({
  chiefComplaints: yup
    .string()
    .required("Chief Complaints is required")
    .min(15, "Minimum 15 Characters")
    .max(200, "Maximum 200 Characters"),

  allergicHistory: yup
    .string()
    .required("Allergic History is required")
    .min(15, "Minimum 15 Characters")
    .max(200, "Maximum 200 Characters"),

  pastTreatmentReceived: yup
    .string()
    .required("Past Treatment Received is required")
    .min(15, "Minimum 15 Characters")
    .max(200, "Maximum 200 Characters"),
});
