## Logger

A simple logging library for node.js

![Terminal Image](https://i.imgur.com/PYikk0n.png)

## How to use

Create Logger

```js
LogManager
    .registerLogger("GameServer", "../logs/gameserver.log")
    .setLevel(LogLevel.Fatal);
```

Logging Messages

```js
// Log Info
LogManager
    .getLogger("GameServer")
    .logInfo("Hello World!")

// Log Debug
LogManager
    .getLogger("GameServer")
    .logDebug("Hello World!");

// Log Warn
LogManager
    .getLogger("GameServer")
    .logWarn("Warning!");

// Log Error
LogManager
    .getLogger("GameServer")
    .logError("Error!");

// Log Fatal
LogManager
    .getLogger("GameServer")
    .logFatal("Fatal Error!");
```

Save Logs

```js
// Save logs in interval
setInterval(() => {
    LogManager
        .getLogger("GameServer")
        .saveFileLogs();
}, 1500);
```

Logging Levels

```js
enum LogLevel {
    Debug,
    Info,
    Warn,
    Error,
    Fatal
}
```
