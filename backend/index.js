"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("electron/main");
const node_path_1 = __importStar(require("node:path"));
const env_1 = require("./utils/env");
const prepareNext_1 = require("./utils/prepareNext");
const database_1 = require("./database");
const electron_1 = require("electron");
function createWindow() {
  const win = new main_1.BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: node_path_1.default.join(__dirname, "preload.js"),
    },
  });
  env_1.isDev
    ? win.loadURL("http://localhost:4444/")
    : win.loadFile(
        (0, node_path_1.join)(__dirname, "..", "src", "out", "index.html")
      );
  env_1.isDev && win.webContents.openDevTools();
  env_1.isDev && win.maximize();
}
main_1.app.whenReady().then(async () => {
  await (0, prepareNext_1.prepareNext)("./src", 4444);
  createWindow();
  main_1.app.on("activate", () => {
    if (main_1.BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
main_1.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    main_1.app.quit();
  }
});
electron_1.ipcMain.on("addUser", (event, user) => {
  (0, database_1.addUser)(user)
    .then((data) => {
      event.returnValue = {
        error: false,
        data,
      };
    })
    .catch((error) => {
      event.returnValue = {
        error: true,
        data: error,
      };
    });
});
