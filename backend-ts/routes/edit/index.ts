import { readFileSync, writeFileSync } from "fs";
import path from "node:path";

export function getPatientInfo({ patientid }: any): any {
  return new Promise((resolve, reject) => {
    try {
      const patientRecords = JSON.parse(
        readFileSync(
          path.join(__dirname, "..", "..", "patients.json") || "",
          "utf8"
        ) || "{}"
      );
      const patientInfo = patientRecords?.patientInfo;
      if (patientRecords && patientInfo) {
        const patientIndex = patientInfo.findIndex(
          (patientObj: any) => patientObj.id === patientid
        );
        const getCurrentPatient = patientInfo?.[patientIndex];
        if (getCurrentPatient)
          resolve({
            data: getCurrentPatient,
            status: 200,
          });
        else reject({ message: "no record found", status: 404 });
      }
      reject({
        message: "no record found",
        status: 404,
      });
    } catch (e) {
      console.error("ERROR IN getPatientInfo", e);
      reject(e);
    }
  });
}

export function putPatientData(patientData: any, { patientid }: any): any {
  return new Promise((resolve, reject) => {
    try {
      const body = { ...patientData };
      const patientRecords = JSON.parse(
        readFileSync(
          path.join(__dirname, "..", "..", "patients.json") || "",
          "utf8"
        ) || "{}"
      );
      const patientInfo = patientRecords?.patientInfo;
      if (patientRecords && patientInfo) {
        const patientIndex = patientInfo.findIndex(
          (patientObj: any) => patientObj.id === patientid
        );
        if (patientIndex !== -1) {
          patientRecords.patientInfo[patientIndex] = body;
          writeFileSync(
            path.join(__dirname, "..", "..", "patients.json") || "",
            JSON.stringify({ ...patientRecords })
          );
          return resolve({
            message: "Patient updated successfully!",
            data: body,
            status: 200,
          });
        }
        return reject({
          message: "no record found",
          status: 404,
        });
      }
      reject({
        message: "no record found",
        status: 404,
      });
    } catch (e) {
      console.error("ERROR IN putPatientData", e);
      reject(e);
    }
  });
}

export function recoveryPatientInfo(patientData: any): any {
  return new Promise((resolve, reject) => {
    try {

      if (patientData) {

        writeFileSync(
          path.join(__dirname, "..", "..", "patients.json") || "",
          JSON.stringify({ ...patientData })
        );

        return resolve({
          message: "Json getting successfully!",
          status: 200,
        });
      }
    } catch (e) {
      console.error("ERROR IN recoveryPatientInfo", e);
      reject(e);
    }
  });
}

export function patchPatientData(patientData: any): any {
  return new Promise((resolve, reject) => {
    try {
      const body: any = patientData;
      const patientRecords: any = JSON.parse(
        readFileSync(
          path.join(__dirname, "..", "..", "patients.json") || "",
          "utf8"
        ) || "{}"
      );
      if (patientRecords) {
        patientRecords.invoiceNo = body.invoiceNo;
        writeFileSync(
          path.join(__dirname, "..", "..", "patients.json") || "",
          JSON.stringify({ ...patientRecords })
        );
        return resolve({
          message: "Invoice updated successfully!",
          invoiceNo: body.invoiceNo,
          status: 200,
        });
      }
      reject({
        message: "There is an error while updating invoice no",
        status: 404,
      });
    } catch (e) {
      console.error("ERROR IN patchPatientData", e);
      reject(e);
    }
  });
}
