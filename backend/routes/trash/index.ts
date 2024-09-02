import { readFileSync } from "fs";
import { app } from "electron";
import { join } from "path";

const dirNam = __dirname;
const getPath = app.isPackaged? join(app.getPath('userData'), 'patients.json') : join(dirNam, '..', '..', "patients.json");

export function getAllTrashs(): any {
  return new Promise((resolve, reject) => {
    try {
      const patientRecords = JSON.parse(
        readFileSync(
            getPath || "",
          "utf8"
        ) || "{}"
      );

      const patientInfo = patientRecords?.patientInfo?.filter(
        (patientObj: any) => patientObj.isDeleted
      );

      if (patientInfo?.length) {
        return resolve({
          data: patientInfo,
          invoiceNo: patientRecords?.invoiceNo,
          status: 200,
        });
      }

      return reject({
        message: "no record found",
        status: 404,
      });
    } catch (e) {
      console.error("ERROR IN getAllTrashs", e);
      reject(e);
    }
  });
}