import { readFileSync } from "fs";
import path from "node:path";

export function getInvoiceNo(): any {
  return new Promise((resolve, reject) => {
    try {
      const patientRecords = JSON.parse(
        readFileSync(path.join(__dirname, '..', "patients.json") || '', "utf8") || '{}'
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