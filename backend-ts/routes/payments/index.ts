import { readFileSync } from "fs";
import path from "node:path";

export function getAllPayments(): any {
  return new Promise((resolve, reject) => {
    try {
      const patientRecords = JSON.parse(
        readFileSync(
          path.join(__dirname, "..", "patients.json") || "",
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
