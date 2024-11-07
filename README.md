## Logger

A simple logging library for node.js

## How to use

Create Logger

```js
LogManager
    .registerLogger("GameServer", "../logs/gameserver.log")
    .setLevel(LogLevel.Fatal);
```
