import { LogManager } from "./Logger";
import { LogLevel } from "./LogLevel";

LogManager
    .registerLogger("GameServer", "./logs/gameserver.log")
    .setLevel(LogLevel.Fatal);

LogManager
    .getLogger("GameServer")
    .logInfo("Info");

LogManager
    .getLogger("GameServer")
    .logDebug("Debug");

LogManager
    .getLogger("GameServer")
    .logWarn("Warn");

LogManager
    .getLogger("GameServer")
    .logError("Error");

LogManager
    .getLogger("GameServer")
    .logFatal("Fatal");