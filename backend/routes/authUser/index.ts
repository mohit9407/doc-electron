import { readFileSync, existsSync, writeFile, writeFileSync } from "fs";
import { app } from "electron";
import { join } from "path";
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
            else writeFileSync(getPath, JSON.stringify(authCred));
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