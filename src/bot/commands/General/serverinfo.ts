import type { Message } from "discord.js";
import { ApplyOptions } from "@sapphire/decorators";
import type { CxCommandOptions } from "@typings/index";
import CxCommand from "@lib/extensions/CxCommand";
import CxEmbed from "@lib/extensions/CxEmbed";

@ApplyOptions<CxCommandOptions>({
  aliases: ["si"],
  category: "Utilities",
  description: "Gets information about a guild.",
  detailedDescription:
    "Gets information about the guild that the command is ran in.",
  examples: ["cx serverinfo"],
  preconditions: ["GuildOnly"],
  usage: "cx serverinfo",
})
export default class Userinfo extends CxCommand {
  async run(message: Message): Promise<Message | null> {
    let guild = message.guild;
    return message.channel.send({
      embeds: [
        new CxEmbed()
          .setTitle("Info about: " + message.guild!.name)
          .setThumbnail(guild!.iconURL({ dynamic: true })!)
          .addField("Created at: ", guild!.createdAt.toDateString(), true)
          .setColor("RANDOM")
          .setFooter(guild!.id),
      ],
    });
  }
}