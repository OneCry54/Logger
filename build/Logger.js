"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogManager = exports.Logger = void 0;
const chalk_1 = __importDefault(require("chalk"));
const LogLevel_1 = require("./LogLevel");
const Utils_1 = require("./Utils");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Logger {
    constructor(name, logsFile) {
        /**
         * Current log level
         */
        this.level = LogLevel_1.LogLevel.Info;
        /**
         * Accumulated logs to be written to the file
         */
        this.appendLogs = '';
        this.name = name;
        this.logsFileOutput = logsFile;
        /**
         * Ensure the log file exists if a file path is provided
         */
        if (this.logsFileOutput) {
            this.ensureLogFile();
        }
    }
    /**
     * Ensure the log file exists by creating directories if necessary
     */
    ensureLogFile() {
        if (!fs_1.default.existsSync(this.logsFileOutput)) {
            const directoryPath = path_1.default.dirname(this.logsFileOutput);
            /**
             * Create the directory if it doesn't exist
             */
            fs_1.default.mkdir(directoryPath, { recursive: true }, (err) => {
                if (err) {
                    return console.error("Cannot create directory file: " + directoryPath, err);
                }
                /**
                 * Create an empty log file
                 */
                fs_1.default.writeFileSync(this.logsFileOutput, "");
            });
        }
    }
    /**
     * Log messages with a specified log level, text, and color
     */
    log(logLevel, text, colorName) {
        /**
         * Return if the log level is lower than the current level
         */
        if (logLevel > this.level) {
            return;
        }
        const now = new Date();
        const timestamp = Utils_1.Utils.formatDateTimestamp(now);
        const level = LogLevel_1.levels[logLevel];
        const message = `[${timestamp}] [${level}] ${this.name} - ${text}`;
        /**
         * We use chalk to color the message
         */
        //@ts-ignore
        const color = chalk_1.default[colorName];
        console.log(color(message));
        if (this.logsFileOutput) {
            /**
             * Append the message to the accumulated logs
             */
            this.appendLogs += "\n" + message;
        }
    }
    /**
     * Save accumulated logs to the file
     */
    saveFileLogs() {
        if (this.appendLogs.length > 1) {
            /**
             * Append the accumulated logs to the file
             */
            fs_1.default.appendFile(this.logsFileOutput, this.appendLogs, "utf-8", (err) => {
                if (err) {
                    return console.error("Unable to save logs: " + err);
                }
                /**
                 * Clear the accumulated logs after saving
                 */
                this.appendLogs = "";
            });
        }
    }
    /**
     * Set the log level
     */
    setLevel(level) {
        this.level = level;
        return this;
    }
    /**
     * Log debug messages
     */
    logDebug(text) {
        this.log(LogLevel_1.LogLevel.Debug, text, "cyan");
    }
    /**
     * Log info messages
     */
    logInfo(text) {
        this.log(LogLevel_1.LogLevel.Info, text, "blue");
    }
    /**
     * Log warning messages
     */
    logWarn(text) {
        this.log(LogLevel_1.LogLevel.Warn, text, "yellow");
    }
    /**
     * Log error messages
     */
    logError(text) {
        this.log(LogLevel_1.LogLevel.Error, text, "red");
    }
    /**
     * Log fatal messages
     */
    logFatal(text) {
        this.log(LogLevel_1.LogLevel.Fatal, text, "magenta");
    }
}
exports.Logger = Logger;
const loggers = {};
class LogManager {
    static registerLogger(name, logsFile) {
        return loggers[name] = new Logger(name, logsFile);
    }
    static getLogger(name) {
        return loggers[name];
    }
}
exports.LogManager = LogManager;
