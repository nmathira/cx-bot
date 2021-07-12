import {Command} from "discord-akairo";
import {Message, MessageEmbed} from "discord.js";
import {version} from "@config/config"

export default class BotInfo extends Command {
  public constructor() {
    super("botinfo", {
      aliases: ["botinfo"],
      category: "Public Commands",
      description: {
        content: "Displays general info about the bot",
        usage: "botinfo",
        examples: ["botinfo"],
      },
    });
  }

  public async exec(message: Message): Promise<Message> {
    let embed = new MessageEmbed()
      .setTitle("Invite Link")
      // .setURL(this.client.generateInvite({permissions: [Permissions.FLAGS.ADMINISTRATOR]}))
      .addField("version", version)
      .setAuthor(this.client.user!.tag, this.client.user!.displayAvatarURL())
      .setTimestamp(Date.now());
    return await message.util!.send({embeds: [embed]})
  }
}
