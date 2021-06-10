import {Command,  Listener} from "discord-akairo";
import {Message} from "discord.js";

export default class missingPermissions extends Listener{
    public constructor() {
        super('missingPermissions', {
            emitter: "commandHandler",
            event: "missingPermissions",
        });
    }

    public exec(message: Message, command: Command, reason): any {
        return message.util.reply(`You don't have the required permissions to run ${command.id}`)
    }
}
