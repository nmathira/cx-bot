import {Command, Listener} from "discord-akairo";
import {Message} from "discord.js";
export default class CommandBlocked extends Listener {
    public constructor() {
        super('commandBlocked', {
            emitter: "commandHandler",
            event: "commandBlocked"
        });
    }

    public exec(message: Message, command: Command, reason) {
        console.log(`${message.author.username} was blocked from using ${command.id} because of ${reason}`)
        return message.util.reply("You have been blocked. Deleted. Also, Backtraced")
    }
}
