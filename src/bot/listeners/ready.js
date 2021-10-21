"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const framework_1 = require("@sapphire/framework");
class Ready extends framework_1.Listener {
  constructor(context) {
    super(context, { once: true });
  }
  run() {
    this.container.logger.info(`

    ========================================================================================

       ______     __  __     ______     ______     ______
      /\\  ___\\   /\\_\\_\\_\\   /\\  == \\   /\\  __ \\   /\\__  _\\\t| Currently in ${
        this.container.client.guilds.cache.size
      } guilds
      \\ \\ \\____  \\/_/\\_\\/_  \\ \\  __<   \\ \\ \\/\\ \\  \\/_/\\ \\/\t| Using ${(
        process.memoryUsage().heapUsed /
        1024 /
        1024
      ).toFixed(2)} MiB / ${(
      process.memoryUsage().heapTotal /
      1024 /
      1024
    ).toFixed(2)} MiB of RAM
       \\ \\_____\\   /\\_\\/\\_\\  \\ \\_____\\  \\ \\_____\\    \\ \\_\\\t| With ${
         this.container.stores.get("commands").size
       } Commands, ${this.container.stores.get("listeners").size} Listeners, ${
      this.container.stores.get("preconditions").size
    } Preconditions, and ${this.container.stores.get("tasks").size} Tasks.
        \\/_____/   \\/_/\\/_/   \\/_____/   \\/_____/     \\/_/\t| As ${
          this.container.client.user?.tag
        } (${this.container.client.user?.id})


    ========================================================================================
    `);
    this.container.client.user?.setPresence({ status: "online" });
  }
}
exports.default = Ready;
