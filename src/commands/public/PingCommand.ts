import {Command} from "discord-akairo";
import {Message} from "discord.js";

export default class PingCommand extends Command {
    public constructor() {
        super("ping", {
            aliases: ["ping"],
            category: "Public Commands",
            description: {
                content: "Check latency between the bot and the Discord API",
                usage: "ping",
                examples: ["ping"]
            },
            ratelimit: 3,
        });
    }

    public async exec(message: Message): Promise<Message> {
        let initial = await message.util.reply()
        return message.util.send(`ping: \`${this.client.ws.ping}ms\``);
    }
}