import {Command} from "discord-akairo";
import {Message, MessageEmbed} from "discord.js";

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
        const sent = await message.util.send('you have good eyes!');
        // @ts-ignore
        // ???????????????????
        const timeDiff: number = (sent.editedAt || sent.createdAt) - (message.editedAt || message.createdAt);

        return message.util.send(new MessageEmbed()
            .addFields({name: "Latest:", value: timeDiff})
            .addFields({name: "Average:", value: this.client.ws.ping})
        );
    }
}