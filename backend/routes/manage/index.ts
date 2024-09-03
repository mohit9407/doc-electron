import { readFileSync, existsSync, writeFile, writeFileSync } from "fs";
import { v4 as uuidV4 } from "uuid";
import { app } from "electron";
import puppeteer from "puppeteer";
import handlers from "handlebars";
import path from "node:path";
import { join } from "path";

const dirNam = __dirname;
const getPath = app.isPackaged? join(app.getPath('userData'), 'patients.json') : join(dirNam, '..', '..', "patients.json");
export function addPatient(patient: any): any {
  return new Promise((resolve, reject) => {
    try {
      if (patient) {
        const reqData = { id: uuidV4(), ...patient };
        let a: any = '{}';
        if (existsSync(getPath)) {
          a =  readFileSync(getPath || '', "utf8")
        }
        const patientRecords = JSON.parse(
          a
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
        if (!existsSync(getPath)) {
          writeFile(getPath, JSON.stringify(patientObj), (err) => {
            throw(err);
          });
        }
        else writeFileSync(getPath || '', JSON.stringify(patientObj));
        resolve({
          message: "Patient added successfully!", data: reqData,
          status: 201,
        });
      } else {
        reject({
          message: "Bad request!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
}

export function getAllPatients(): any {
  return new Promise((resolve, reject) => {
    try {
      let patientRecords: any = '{}';
      if (existsSync(getPath)) {
        patientRecords = JSON.parse(
          readFileSync(getPath || '', "utf8") || '{}'
        );
      }
      const patientInfo = patientRecords?.patientInfo?.filter(
        (patientObj: any) => !patientObj.isDeleted
      );

      if (patientInfo?.length) {
        return resolve({
          data: patientInfo, invoiceNo: patientRecords?.invoiceNo,
          status: 200
        });
      }

      return reject({ message: "no record found", status: 404 });
    } catch (e) {
      console.error("ERROR IN getAllPatients", e);
      reject(e);
    }
  })
}


export function generateInvoice(patientData: any): any {
  return new Promise(async (resolve, reject) => {
    try {
      const { name, mobileNumber, age, paymentHistory: { invoiceNo, date, treatment, amountCharges } } = patientData;
      const customerName = name || "John Doe";
      const localDate = new Date(date);

      // Format the date using toLocaleDateString
      let formattedDate:any = Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      formattedDate = formattedDate.format(localDate);

      // read our invoice-template.html file using node fs module
      const file = readFileSync(
        path.join(dirNam, "invoice-template.html") || '',
        "utf8"
      );
      // compile the file with handlebars and inject the customerName variable
      const template = handlers.compile(`${file}`);
      const html = template({ customerName, invoiceNo, date: formattedDate, mobileNumber, age, treatment, amountCharges });
      // simulate a chrome browser with puppeteer and navigate to a new page
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      // set our compiled html template as the pages content
      // then waitUntil the network is idle to make sure the content has been loaded
      await page.setContent(html, { waitUntil: "networkidle0" });
      // convert the page to pdf with the .pdf() method
      const pdf = await page.pdf({ format: "A4" });
      await browser.close();
      return resolve(pdf);
    } catch (e) {
      console.error("ERROR IN generateInvoice", e);
      reject(e);
    }
  })
}

export function generateBackup(): any {
  return new Promise((resolve, reject) => {
    try {
      let patientRecords = '{}';
      if (existsSync(getPath)) {
        patientRecords = JSON.parse(
          readFileSync(getPath || '', "utf8") || '{}'
        );
      }
      return resolve({
        data: patientRecords,
        status: 200
      });
    } catch (e) {
      console.error("ERROR IN getAllPatients", e);
      reject(e);
    }
  })
}