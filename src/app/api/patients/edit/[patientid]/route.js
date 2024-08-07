import { NextResponse, NextRequest } from "next/server";
import { readFileSync, writeFileSync } from "fs";
/**
 * @param {NextRequest} req
 */
export async function GET(_, { params: { patientid } }) {
  try {
    const patientRecords = JSON.parse(
      readFileSync(process.env.jsonFilePath, "utf8") || null
    );
    const patientInfo = patientRecords?.patientInfo;
    if (patientRecords && patientInfo) {
      const patientIndex = patientInfo.findIndex(
        (patientObj) => patientObj.id === patientid
      );
      const getCurrentPatient = patientInfo?.[patientIndex];
      if (getCurrentPatient)
        return NextResponse.json({ data: getCurrentPatient }, { status: 200 });
      return NextResponse.json({ message: "no record found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params: { patientid } }) {
  try {
    const body = await req.json();
    const patientRecords = JSON.parse(
      readFileSync(process.env.jsonFilePath, "utf8") || null
    );
    const patientInfo = patientRecords?.patientInfo;
    if (patientRecords && patientInfo) {
      const patientIndex = patientInfo.findIndex(
        (patientObj) => patientObj.id === patientid
      );
      if (patientIndex !== -1) {
        patientRecords.patientInfo[patientIndex] = body;
        writeFileSync(
          process.env.jsonFilePath,
          JSON.stringify({ ...patientRecords })
        );
        return NextResponse.json(
          { message: "Patient updated successfully!", data: body },
          { status: 200 }
        );
      }
      return NextResponse.json({ message: "no record found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
