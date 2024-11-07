"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = require("./Logger");
const LogLevel_1 = require("./LogLevel");
Logger_1.LogManager
    .registerLogger("GameServer", "../logs/gameserver.log")
    .setLevel(LogLevel_1.LogLevel.Fatal);
Logger_1.LogManager
    .getLogger("GameServer")
    .logInfo("Info");
Logger_1.LogManager
    .getLogger("GameServer")
    .logDebug("Debug");
Logger_1.LogManager
    .getLogger("GameServer")
    .logWarn("Warn");
Logger_1.LogManager
    .getLogger("GameServer")
    .logError("Error");
Logger_1.LogManager
    .getLogger("GameServer")
    .logFatal("Fatal");
