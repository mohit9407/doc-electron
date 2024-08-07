import { NextResponse, NextRequest } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { v4 as uuidV4 } from "uuid";
/**
 * @param {NextRequest} req
 */
export async function POST(req) {
  try {
    const body = await req.json();
    if (body) {
      const reqData = { id: uuidV4(), ...body };
      const patientRecords = JSON.parse(
        readFileSync(process.env.jsonFilePath, "utf8") || null
      );
      let patientObj = {};
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
      writeFileSync(process.env.jsonFilePath, JSON.stringify(patientObj));
      return NextResponse.json(
        { message: "Patient added successfully!", data: reqData },
        { status: 201 }
      );
    }
    return NextResponse.json({ message: "Bad request!" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

/**
 * @param {NextRequest} req
 */
export async function GET() {
  try {
    const patientRecords = JSON.parse(
      readFileSync(`/home/fcom4/Desktop/app.json`, "utf8") || null
    );

    return NextResponse.json(
      { invoiceNo: patientRecords?.invoiceNo },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
