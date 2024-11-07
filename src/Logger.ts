import { LogLevel } from "./LogLevel";


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

    public log(level: LogLevel, text: string) {
        if (level > this.level) {
            return;
        }

        
    }

    public logDebug(text: string) {
        this.log(LogLevel.Debug, text);
    }

    public logInfo(text: string) {
        this.log(LogLevel.Info, text);
    }

    public logWarn(text: string) {
        this.log(LogLevel.Warn, text);
    }

    public logError(text: string) {
        this.log(LogLevel.Error, text);
    }

    public logFatal(text: string) {
        this.log(LogLevel.Fatal, text);
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