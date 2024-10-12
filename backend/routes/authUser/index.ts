import { readFileSync, existsSync, writeFile, writeFileSync } from "fs";
import { app } from "electron";
import { join } from "path";
import nodemailer from "nodemailer";
import { authCred } from "../../utils/authCred";

const dirNam = __dirname;
const getPath = app.isPackaged
  ? join(app.getPath("userData"), "authUser.json")
  : join(dirNam, "..", "..", "authUser.json");

export function getAuthUser({ email, password }: any): any {
    return new Promise((resolve, reject) => {
        try {
            let authInfo: any = '{}';
            if (existsSync(getPath)) {
                authInfo = readFileSync(
                  getPath || "",
                "utf8"
              ) || "{}"
              }
              const authData = JSON.parse(
                authInfo
              );
          if (email === authData.email && password === authData.password) {
            return resolve({
              message: "User authorize successfully!",
              status: 200,
            });
          }
          else {
            return resolve({
                message: "User is not authorize successfully!",
                status: 401
            });
          }
        } catch (e) {
          console.error("ERROR while authenticate the user!", e);
          reject(e);
        }
    });
}

export function getAuthFile(): any {
    return new Promise((resolve, reject ) => {
        try {
            if (!existsSync(getPath)) {
                writeFile(getPath, JSON.stringify(authCred), (err) => {
                    throw(err);
                });
            }
            else {
              const authData = readFileSync(
                getPath || "",
              "utf8"
            ) || "{}";
              const isDataExist  = Object.keys(JSON.parse(authData)).length > 0;
              if (!isDataExist) writeFileSync(getPath, JSON.stringify(authCred));
            }
            return resolve({
                message: "auth added!",
                status: 201,
            });
        } catch (e) {
            return reject({
                message: "error while adding auth: " + e,
                status: 500,
            });
        }
    });
};

export function getAndUpdateUserPswd({ oldPassword, newPassword }: any): any {
  return new Promise((resolve, reject) => {
      try {
          let authInfo: any = '{}';
          if (existsSync(getPath)) {
              authInfo = readFileSync(
                getPath || "",
              "utf8"
            ) || "{}"
            }
            const authData = JSON.parse(
              authInfo
            );
        if (oldPassword === authData.password) {
          authData.password = newPassword;
          writeFileSync(getPath, JSON.stringify(authData));
          return resolve({
            message: "User password is updated successfully!",
            status: 204
        });
        }
        else {
          return resolve({
              message: "There is no user with password: " + oldPassword,
              status: 401
          });
        }
      } catch (e) {
        console.error("ERROR while updating user password!", e);
        reject(e);
      }
  });
}

export function sendPswdOnMail({ mail }: any): any {
  return new Promise((resolve, reject) => {
      try {
          let authInfo: any = '{}';
          if (existsSync(getPath)) {
              authInfo = readFileSync(
                getPath || "",
              "utf8"
            ) || "{}"
            }
            const authData = JSON.parse(
              authInfo
            );
        if (mail === authData?.mail) {
          console.log("auth data pswd: ", authData.password, process.env.jsonFilePath)
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              user: '', // Replace with your own email
              pass: '' // Replace with your own password
            }
          });

          // Configure the email details
          const mailOptions = {
            from: '',
            to: "",
            subject: "Remind Password",
            text: "this is your password"
          };

          // Send the email
          transporter.sendMail(mailOptions, (error: any) => {
            if (error) {
              return resolve({
                message: "There is an issue while sending mail!",
                status: 500
              });
            } else {
              return resolve({
                message: "Password is successfully send to the given mail!",
                status: 200
              });
            }
          });
        }
        else {
          return resolve({
              message: "There is no user with this mail: " + mail,
              status: 401
          });
        }
      } catch (e) {
        console.error("ERROR while sending password on mail!", e);
        reject(e);
      }
  });
}