import { readFileSync } from "fs";
import { app } from "electron";
import { join } from "path";

const dirNam = __dirname;
const getPath = app.isPackaged? join(app.getPath('userData'), 'patients.json') : join(dirNam, '..', "patients.json");

export function getInvoiceNo(): any {
  return new Promise((resolve, reject) => {
    try {
      const patientRecords = JSON.parse(
        readFileSync(getPath || '', "utf8") || '{}'
      );

      resolve({
        invoiceNo: patientRecords?.invoiceNo,
        status: 200
      });
    } catch (e) {
      console.error("ERROR IN getInvoiceNo", e);
      reject(e);
    }
  })
}