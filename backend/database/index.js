"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = void 0;

function addUser(user) {
    return new Promise((resolve, reject) => {
        try {
            resolve({
                id: 125465
            });
        }
        catch (e) {
            console.error("ERROR IN addUser", e);
            reject(e);
        }
    });
}
exports.addUser = addUser;
