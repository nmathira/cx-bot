import { Command, Listener } from "discord-akairo";
import { Message } from "discord.js";

export default class CommandBlocked extends Listener {
    public constructor() {
        super('commandBlocked', {
            emitter: "commandHandler",
            event: "commandBlocked"
        });
    }

    public exec(message: Message, command: Command, reason: string) {
        return message.util!.reply(` You are blocked from using ${command.id} because of ${reason}`)
    }
}
