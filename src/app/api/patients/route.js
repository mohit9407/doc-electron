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
      const patientRecords = JSON.parse(
        readFileSync("/home/fcom4/Desktop/app.json", "utf8") || null
      );
      let patientObj = {};
      if (!patientRecords || (patientRecords && !patientRecords?.patientInfo)) {
        patientObj = {
          patientInfo: [{ id: uuidV4(), ...body }],
        };
      } else {
        patientObj = { ...patientRecords };
        patientObj.patientInfo.push({ id: uuidV4(), ...body });
      }
      writeFileSync("/home/fcom4/Desktop/app.json", JSON.stringify(patientObj));
      return NextResponse.json(
        { message: "Patient added successfully!" },
        { status: 201 }
      );
    }
    return NextResponse.json({ message: "Bad request!" }, { status: 400 });
  } catch (error) {
    console.log("Error while adding patient: ", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
