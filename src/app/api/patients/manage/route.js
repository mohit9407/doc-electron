import { NextResponse, NextRequest } from "next/server";
import { readFileSync } from "fs";
import puppeteer from "puppeteer";
import handlers from "handlebars";
/**
 * @param {NextRequest} req
 */
export async function GET() {
  try {
    const patientRecords = JSON.parse(
      readFileSync(`/home/fcom4/Desktop/app.json`, "utf8") || null
    );
    const patientInfo = patientRecords?.patientInfo;

    if (patientInfo?.length) {
      return NextResponse.json(
        { data: patientInfo, invoiceNo: patientRecords?.invoiceNo },
        { status: 200 }
      );
    }
    return NextResponse.json({ message: "no record found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

/**
 * @param {NextRequest} req
 */
export async function POST(req) {
  const body = await req.json();
  const { name } = body;
  const customerName = name || "John Doe";

  try {
    // read our invoice-template.html file using node fs module
    const file = readFileSync(
      "./src/app/api/patients/manage/invoice-template.html",
      "utf8"
    );
    // compile the file with handlebars and inject the customerName variable
    const template = handlers.compile(`${file}`);
    const html = template({ customerName });
    // simulate a chrome browser with puppeteer and navigate to a new page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // set our compiled html template as the pages content
    // then waitUntil the network is idle to make sure the content has been loaded
    await page.setContent(html, { waitUntil: "networkidle0" });
    // convert the page to pdf with the .pdf() method
    const pdf = await page.pdf({ format: "A4" });
    await browser.close();
    return new Response(pdf, { headers: { "content-type": "image/png" } });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: err }, { status: 500 });
  }
}
