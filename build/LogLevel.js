"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.levels = exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Debug"] = 0] = "Debug";
    LogLevel[LogLevel["Info"] = 1] = "Info";
    LogLevel[LogLevel["Warn"] = 2] = "Warn";
    LogLevel[LogLevel["Error"] = 3] = "Error";
    LogLevel[LogLevel["Fatal"] = 4] = "Fatal";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
exports.levels = ["DEBUG", "INFO", "WARN", "ERROR", "FATAL"];
