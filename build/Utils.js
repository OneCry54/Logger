"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
class Utils {
    static formatDateTimestamp(date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
    }
}
exports.Utils = Utils;
