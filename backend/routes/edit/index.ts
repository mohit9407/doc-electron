import { readFileSync, writeFileSync } from "fs";
import { app } from "electron";
import { join } from "path";

const dirNam = __dirname;
const getPath = app.isPackaged? join(app.getPath('userData'), 'patients.json') : join(dirNam, '..', '..', "patients.json");
export function getPatientInfo({ patientid }: any): any {
  return new Promise((resolve, reject) => {
    try {
      const patientRecords = JSON.parse(
        readFileSync(
            getPath || "",
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
            getPath || "",
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
            getPath || "",
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

export function patchPatientData(patientData: any): any {
  return new Promise((resolve, reject) => {
    try {
      const body: any = patientData;
      const patientRecords: any = JSON.parse(
        readFileSync(
            getPath || "",
          "utf8"
        ) || "{}"
      );
      if (patientRecords) {
        patientRecords.invoiceNo = body.invoiceNo;
        writeFileSync(
            getPath || "",
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