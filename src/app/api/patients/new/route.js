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
        readFileSync(`/home/fcom4/Desktop/app.json`, "utf8") || null
      );
      let patientObj = {};
      if (!patientRecords || (patientRecords && !patientRecords?.patientInfo)) {
        patientObj = {
          patientInfo: [reqData],
        };
      } else {
        patientObj = { ...patientRecords };
        patientObj.patientInfo.push(reqData);
      }
      writeFileSync("/home/fcom4/Desktop/app.json", JSON.stringify(patientObj));
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
