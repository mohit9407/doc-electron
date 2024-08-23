import { app, BrowserWindow } from "electron/main";
import path, { join } from "node:path";
import { isDev } from "./utils/env";
import { prepareNext } from "./utils/prepareNext";
import { addPatient, getInvoiceNo } from "./routes";
import { getAllPatients, generateInvoice, generateBackup } from "./routes/manage";
import { getPatientInfo, putPatientData, patchPatientData } from "./routes/edit";
import { getAllPayments } from "./routes/payments";
import { ipcMain } from "electron";
import { getAllTrashs } from "./routes/trash";

/**
 * Creates a new BrowserWindow with the specified dimensions and web preferences.
 * If in development mode, the window loads the local development server URL,
 * otherwise it loads the built src index.html file.
 *
 * @return {void}
 */
function createWindow(): void {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  isDev
    ? win.loadURL("http://localhost:4444/")
    : win.loadFile(join(__dirname, "..", "src", "out", "index.html"));

    win.webContents.openDevTools();

  isDev && win.webContents.openDevTools();
  isDev && win.maximize();
}

app.whenReady().then(async () => {
  await prepareNext("./src", 4444);

  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

/* ++++++++++ code ++++++++++ */
ipcMain.on("addPatient", (event, patientData: any) => {
  addPatient(patientData)
    .then((data: any) => {
      event.returnValue = {
        error: false,
        data,
      };
    })
    .catch((error: any) => {
      event.returnValue = {
        error: true,
        data: error,
      };
    });
});

ipcMain.on("getInvoiceNo", (event) => {
  getInvoiceNo()
    .then((data: any) => {
      event.returnValue = {
        error: false,
        data,
      };
    })
    .catch((error: any) => {
      event.returnValue = {
        error: true,
        data: error,
      };
    });
});

ipcMain.on("getAllPatients", (event) => {
  getAllPatients()
    .then((data: any) => {
      event.returnValue = {
        error: false,
        data,
      };
    })
    .catch((error: any) => {
      event.returnValue = {
        error: true,
        data: error,
      };
    });
});

ipcMain.on("generateInvoice", (event, patientData: any) => {
  generateInvoice(patientData)
    .then((data: any) => {
      event.returnValue = {
        error: false,
        data,
      };
    })
    .catch((error: any) => {
      event.returnValue = {
        error: true,
        data: error,
      };
    });
});

ipcMain.on("generateBackup", (event) => {
  generateBackup()
    .then((data: any) => {
      event.returnValue = {
        error: false,
        data,
      };
    })
    .catch((error: any) => {
      event.returnValue = {
        error: true,
        data: error,
      };
    });
});

ipcMain.on("getPatientInfo", (event, { patientid }: any) => {
  getPatientInfo({ patientid })
    .then((data: any) => {
      event.returnValue = {
        error: false,
        data,
      };
    })
    .catch((error: any) => {
      event.returnValue = {
        error: true,
        data: error,
      };
    });
});

ipcMain.on("putPatientData", (event, patientData: any) => {
  putPatientData(patientData, { patientid: patientData?.id })
    .then((data: any) => {
      event.returnValue = {
        error: false,
        data,
      };
    })
    .catch((error: any) => {
      event.returnValue = {
        error: true,
        data: error,
      };
    });
});

ipcMain.on("patchPatientData", (event, patientData: any) => {
  patchPatientData(patientData)
    .then((data: any) => {
      event.returnValue = {
        error: false,
        data,
      };
    })
    .catch((error: any) => {
      event.returnValue = {
        error: true,
        data: error,
      };
    });
});

ipcMain.on("getAllPayments", (event) => {
  getAllPayments()
    .then((data: any) => {
      event.returnValue = {
        error: false,
        data,
      };
    })
    .catch((error: any) => {
      event.returnValue = {
        error: true,
        data: error,
      };
    });
});

ipcMain.on("getAllTrashs", (event) => {
  getAllTrashs()
    .then((data: any) => {
      event.returnValue = {
        error: false,
        data,
      };
    })
    .catch((error: any) => {
      event.returnValue = {
        error: true,
        data: error,
      };
    });
});

