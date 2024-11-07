import chalk from "chalk";
import { levels, LogLevel } from "./LogLevel";
import { Utils } from "./Utils";
import fs from "fs";
import path from "path";

export class Logger {
    /**
     * Name of the logger instance 
     */
    public name: string;

    /**
     * Current log level 
     */
    public level: LogLevel = LogLevel.Info;

    /**
     * Accumulated logs to be written to the file 
     */
    public appendLogs: string = '';

    /**
     * Path to the log file 
     */
    public logsFileOutput: string;

    constructor(name: string, logsFile: string) {
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
    private ensureLogFile(): void {
        if (!fs.existsSync(this.logsFileOutput)) {
            const directoryPath = path.dirname(this.logsFileOutput);

            /**
             * Create the directory if it doesn't exist 
             */
            fs.mkdir(directoryPath, { recursive: true }, (err) => {
                if (err) {
                    return console.error("Cannot create directory file: " + directoryPath, err);
                }

                /**
                 * Create an empty log file 
                 */
                fs.writeFileSync(this.logsFileOutput, "");
            });
        }
    }

    /**
     * Log messages with a specified log level, text, and color 
     */
    public log(logLevel: LogLevel, text: string, colorName: string) {
        /**
         * Return if the log level is lower than the current level 
         */
        if (logLevel > this.level) {
            return;
        }

        const now = new Date();
        const timestamp = Utils.formatDateTimestamp(now);

        const level = levels[logLevel];
        const message = `[${timestamp}] [${level}] ${this.name} - ${text}`;

        /**
         * We use chalk to color the message 
         */
        //@ts-ignore
        const color = chalk[colorName];

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
    public saveFileLogs(): void {
        if (this.appendLogs.length > 1) {

            /**
             * Append the accumulated logs to the file 
             */
            fs.appendFile(this.logsFileOutput, this.appendLogs, "utf-8", (err) => {
                if (err) {
                    return console.error("Unable to save logs: " + err);
                }

                /**
                 * Clear the accumulated logs after saving 
                 */
                this.appendLogs = "";
            })
        }
    }

    /**
     * Set the log level 
     */
    public setLevel(level: LogLevel) {
        this.level = level;
        return this;
    }

    /**
     * Log debug messages 
     */
    public logDebug(text: string) {
        this.log(LogLevel.Debug, text, "cyan");
    }

    /**
     * Log info messages 
     */
    public logInfo(text: string) {
        this.log(LogLevel.Info, text, "blue");
    }

    /**
     * Log warning messages 
     */
    public logWarn(text: string) {
        this.log(LogLevel.Warn, text, "yellow");
    }

    /**
     * Log error messages 
     */
    public logError(text: string) {
        this.log(LogLevel.Error, text, "red");
    }

    /**
     * Log fatal messages 
     */
    public logFatal(text: string) {
        this.log(LogLevel.Fatal, text, "magenta");
    }
}

const loggers: Record<string, Logger> = {};

export class LogManager {

    public static registerLogger(name: string, logsFile: string): Logger {
        return loggers[name] = new Logger(name, logsFile);
    }

    public static getLogger(name: string): Logger {
        return loggers[name];
    }
}