import { LogLevel } from "./LogLevel";


export class Logger {

    public name: string;
    public level: LogLevel = LogLevel.Info;

    constructor(name: string) {
        this.name = name;
    }

    public setLevel(level: LogLevel) {
        this.level = level;
    }

    
}