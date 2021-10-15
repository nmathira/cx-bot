"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const framework_1 = require("@sapphire/framework");
class Warn extends framework_1.Listener {
    constructor(context) {
        super(context);
    }
    run(info) {
        this.container.logger.warn("[CxBot] " + info);
    }
}
exports.default = Warn;
