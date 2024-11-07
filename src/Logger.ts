import chalk from "chalk";
import { levels, LogLevel } from "./LogLevel";
import { Utils } from "./Utils";

export class Logger {

    public name: string;
    public level: LogLevel = LogLevel.Info;
    public logsFileOutput: string;

    constructor(name: string, logsFile: string) {
        this.name = name;
        this.logsFileOutput = logsFile;
    }

    public setLevel(level: LogLevel) {
        this.level = level;
    }

    public log(logLevel: LogLevel, text: string, colorName: string) {
        if (logLevel > this.level) {
            return;
        }

        const now = new Date();
        const timestamp = Utils.formatDateTimestamp(now);

        const level = levels[logLevel];
        const message = `[${timestamp}] [${level}] ${this.name} - ${text}`;

        //@ts-ignore
        const color = chalk[colorName];

        console.log(color(message));
    }

    public logDebug(text: string) {
        this.log(LogLevel.Debug, text, "cyan");
    }

    public logInfo(text: string) {
        this.log(LogLevel.Info, text, "blue");
    }

    public logWarn(text: string) {
        this.log(LogLevel.Warn, text, "yellow");
    }

    public logError(text: string) {
        this.log(LogLevel.Error, text, "red");
    }

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