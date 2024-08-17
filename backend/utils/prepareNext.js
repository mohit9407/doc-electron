"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareNext = void 0;
const http_1 = require("http");
const path_1 = require("path");
const electron_1 = require("electron");
const app_root_path_1 = require("app-root-path");
const env_1 = require("./env");
const devServer = async (dir, port) => {
    const next = require("next")({ dev: true, dir });
    const requestHandler = next.getRequestHandler();
    await next.prepare();
    const server = (0, http_1.createServer)(requestHandler);
    server.listen(port || 4000, () => {
        electron_1.app.on("before-quit", () => server.close());
    });
};
const adjustRenderer = (directory) => {
    const paths = ["/_next", "/static"];
    const isWindows = process.platform === "win32";
    electron_1.protocol.interceptFileProtocol("file", (request, callback) => {
        let path = request.url.substr(isWindows ? 8 : 7);
        for (const prefix of paths) {
            let newPath = path;
            if (isWindows) {
                newPath = newPath.substr(2);
            }
            if (!newPath.startsWith(prefix)) {
                continue;
            }
            if (isWindows) {
                newPath = (0, path_1.normalize)(newPath);
            }
            newPath = (0, path_1.join)(directory, "out", newPath);
            path = newPath;
        }
        path = decodeURIComponent(path);
        callback({ path });
    });
};
const prepareNext = async (directories, port) => {
    if (!directories) {
        throw new Error("Renderer location not defined");
    }
    if (typeof directories === "string") {
        directories = {
            production: directories,
            development: directories,
        };
    }
    for (const directory in directories) {
        if (!{}.hasOwnProperty.call(directories, directory)) {
            continue;
        }
        if (!(0, path_1.isAbsolute)(directories[directory])) {
            directories[directory] = (0, app_root_path_1.resolve)(directories[directory]);
        }
    }
    if (!env_1.isDev) {
        adjustRenderer(directories.production);
        return;
    }
    await devServer(directories.development, port);
};
exports.prepareNext = prepareNext;
