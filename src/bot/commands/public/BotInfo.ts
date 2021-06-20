import {Command} from "discord-akairo";
import {Message, MessageEmbed} from "discord.js";
import {version} from "../../../config/config"

export default class BotInfo extends Command {
    public constructor() {
        super("botinfo", {
            aliases: ["botinfo"],
            category: "Public Commands",
            description: {
                content: "Displays general info about the bot",
                usage: "botinfo",
                examples: ["botinfo"]
            },
        });
    }

    public async exec(message: Message): Promise<Message> {
        return message.util!.send(new MessageEmbed()
            .setTitle("Invite Link")
            .setURL(await this.client.generateInvite({permissions: "ADMINISTRATOR"}))
            .addFields({name: "version", value: version})
            .setAuthor(this.client.user!.tag, this.client.user!.displayAvatarURL())
            .setTimestamp(Date.now())
        )
    }
}