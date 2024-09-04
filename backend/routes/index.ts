<<<<<<< HEAD
import { readFileSync } from "fs";
import { app } from "electron";
import { join } from "path";

const dirNam = __dirname;
const getPath = app.isPackaged? join(app.getPath('userData'), 'patients.json') : join(dirNam, '..', "patients.json");
=======
import { readFileSync, writeFileSync } from "fs";
import { v4 as uuidV4 } from "uuid";
import path from "node:path";

export function addPatient(patient: any): any {
  return new Promise((resolve, reject) => {
    console.log('__dirname', __dirname)
    try {
      if (patient) {
        const reqData = { id: uuidV4(), ...patient };
        const a: any = readFileSync(path.join(__dirname, '..', "patients.json") || '', "utf8")
        const patientRecords = JSON.parse(
          a || '{}'
        );
        let patientObj: any = {};
        if (!patientRecords || (patientRecords && !patientRecords?.patientInfo)) {
          patientObj = {
            patientInfo: [reqData],
            invoiceNo: 1,
          };
        } else {
          patientObj = { ...patientRecords };
          patientObj.patientInfo.push(reqData);
          patientObj.invoiceNo += 1;
        }
        writeFileSync(path.join(__dirname, '..', "patients.json") || '', JSON.stringify(patientObj));
        resolve({
          message: "Patient added successfully!", data: reqData,
          status: 201
        });
      } else {
        reject({
          message: "Bad request!"
        });
      }
    } catch (e) {
      console.error("ERROR IN addPasent", e);
      reject(e);
    }
  });
}
>>>>>>> 5b245f1 (test app)

export function getInvoiceNo(): any {
  return new Promise((resolve, reject) => {
    try {
      const patientRecords = JSON.parse(
<<<<<<< HEAD
        readFileSync(getPath || '', "utf8") || '{}'
=======
        readFileSync(path.join(__dirname, '..', "patients.json") || '', "utf8") || '{}'
>>>>>>> 5b245f1 (test app)
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