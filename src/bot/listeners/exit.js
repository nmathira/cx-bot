"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const framework_1 = require("@sapphire/framework");
class Exit extends framework_1.Listener {
    constructor(context) {
        super(context, { emitter: process });
    }
    run() {
        this.container.logger.fatal("[CxBot] CxBot has been told to shutdown, so it will.");
        this.container.client.destroy();
        framework_1.container.database.$disconnect();
    }
}
exports.default = Exit;
