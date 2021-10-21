"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const framework_1 = require("@sapphire/framework");
class Debug extends framework_1.Listener {
  constructor(context) {
    super(context);
  }
  run(debug) {
    this.container.logger.debug("[CxBot] " + debug);
  }
}
exports.default = Debug;
