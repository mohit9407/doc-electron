import { readFileSync } from "fs";
import { app } from "electron";
import { join } from "path";

const dirNam = __dirname;
const getPath = app.isPackaged? join(app.getPath('userData'), 'patients.json') : join(dirNam, '..', '..', "patients.json");
export function getAllPayments(): any {
  return new Promise((resolve, reject) => {
    try {
      const patientRecords = JSON.parse(
        readFileSync(
            getPath || "",
          "utf8"
        ) || '{}'
      );
      const patientInfo = patientRecords?.patientInfo;

      if (patientInfo?.length) {
        const allpaymentInfo = patientInfo.reduce((initVal: any, nextval: any) => {
          const { paymentInfo, historyInfo, ...rest } = nextval;
          let addedPatientDetails = [];
          if (!rest.isDeleted) {
            addedPatientDetails = paymentInfo
              .filter((paymentObj: any) => !paymentObj.isDeleted)
              .map((paymentObj: any) => ({
                ...paymentObj,
                patientInfo: rest,
              }));
          }
          return [...initVal, ...addedPatientDetails];
        }, []);
        return resolve({
          message: "All allpayment details!",
          data: allpaymentInfo,
          status: 200,
        });
      }
      return reject({
        message: "no record found",
        status: 404
      });
    } catch (e) {
      console.error("ERROR IN getAllPayments", e);
      reject(e);
    }
  });
}