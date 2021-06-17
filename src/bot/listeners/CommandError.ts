import {Command, Listener} from "discord-akairo";
import {Message} from "discord.js";

export default class ErrorListener extends Listener {
    public constructor() {
        super("commandError", {
            emitter: "commandHandler",
            event: "error",
        });
    }

    public async exec(error: Error, message: Message, command ?: Command): Promise<Message> {
        let owner = await this.client.users.fetch("" + this.client.ownerID);
        await owner.send(`AYO boss man fix your code at \`${command}\`, which was called by ${message.author.username} (who is a dumbass) in ${message.guild} who ran \`${message}\``);
        return message.util!.send("An unexpected error occured. My owner has been notified.");
    }
}
