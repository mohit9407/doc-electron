import { NextResponse, NextRequest } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { v4 as uuidV4 } from "uuid";
/**
 * @param {NextRequest} req
 */
export async function POST(req) {
  try {
    const body = await req.json();
    if (body) {
      /*
      get path based on current working directory
      */
      // const filePath = path.join(process.cwd(), "src/data", "patients.json");
      const reqData = { id: uuidV4(), ...body };
      const patientRecords = JSON.parse(
        readFileSync(`C:/Users/admin/Desktop/app.json`, "utf8") || null
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
      writeFileSync(
        "C:/Users/admin/Desktop/app.json",
        JSON.stringify(patientObj)
      );
      return NextResponse.json(
        { message: "Patient added successfully!", data: reqData },
        { status: 201 }
      );
    }
    return NextResponse.json({ message: "Bad request!" }, { status: 400 });
  } catch (error) {
    console.log("Error while adding patient: ", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
