"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const electron_1 = require("electron");
exports.api = {
    on: (channel, callback) => {
        electron_1.ipcRenderer.on(channel, (event, args) => callback(event, args));
    },
    send: (channel, args) => {
        electron_1.ipcRenderer.send(channel, args);
    },
    sendSync: (channel, args) => {
        return electron_1.ipcRenderer.sendSync(channel, args);
    },
};
electron_1.contextBridge.exposeInMainWorld("api", exports.api);
