

export enum LogLevel {
    Debug,
    Info,
    Warn,
    Error,
    Fatal
}

export type ILogName = "DEBUG" | "INFO" | "WARN" | "ERROR" | "FATAL";

export const levels: ILogName[] = ["DEBUG", "INFO", "WARN", "ERROR", "FATAL"];