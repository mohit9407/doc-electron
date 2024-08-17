"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStart = exports.isDev = void 0;
const electron_log_1 = __importDefault(require("electron-log"));
exports.isDev = process.argv.some((str) => str == "--dev");
exports.isStart = process.argv.some((str) => str == "--start");
electron_log_1.default.info("DEV: ", exports.isDev);
electron_log_1.default.info("START: ", exports.isStart);
