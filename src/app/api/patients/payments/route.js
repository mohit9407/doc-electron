import { NextResponse, NextRequest } from "next/server";
import { readFileSync } from "fs";
/**
 * @param {NextRequest} req
 */
export async function GET() {
  try {
    const patientRecords = JSON.parse(
      readFileSync(process.env.jsonFilePath, "utf8") || null
    );
    const patientInfo = patientRecords?.patientInfo;

    if (patientInfo?.length) {
      const allpaymentInfo = patientInfo.reduce((initVal, nextval) => {
        const { paymentInfo, historyInfo, ...rest } = nextval;
        let addedPatientDetails = [];
        if (!rest.isDeleted) {
          addedPatientDetails = paymentInfo
            .filter((paymentObj) => !paymentObj.isDeleted)
            .map((paymentObj) => ({
              ...paymentObj,
              patientInfo: rest,
            }));
        }
        return [...initVal, ...addedPatientDetails];
      }, []);
      return NextResponse.json({ data: allpaymentInfo }, { status: 200 });
    }
    return NextResponse.json({ message: "no record found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
