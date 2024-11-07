## Logger

A simple logging library for node.js

## How to use

Create Logger

```js
import { LogManager } from "./Logger";
import { LogLevel } from "./LogLevel";

LogManager
    .registerLogger("GameServer", "../logs/gameserver.log")
    .setLevel(LogLevel.Fatal);
```
