import type { Message } from "discord.js";
import { ApplyOptions } from "@sapphire/decorators";
import type { CxCommandOptions } from "@typings/index";
import CxCommand from "@lib/extensions/CxCommand";
import CxEmbed from "@lib/extensions/CxEmbed";
import { send } from "@sapphire/plugin-editable-commands";

@ApplyOptions<CxCommandOptions>({
  aliases: ["si"],
  description: "Gets information about a guild.",
  detailedDescription:
    "Gets information about the guild that the command is ran in.",
  examples: ["cx serverinfo"],
  preconditions: ["GuildOnly"],
  usage: "cx serverinfo",
})
export default class Serverinfo extends CxCommand {
  async messageRun(message: Message): Promise<Message | null> {
    let guild = message.guild;
    return send(message, {
      embeds: [
        new CxEmbed()
          .setTitle("Info about: " + message.guild!.name)
          .setThumbnail(guild!.iconURL({ dynamic: true })!)
          .addField(
            "Owned by: ",
            await guild.fetchOwner().then(member => member.toString()),
          )
          .addField("Members: ", guild.memberCount.toString(), true)
          .addField("Channels: ", guild.channels.cache.size.toString(), true)
          .addField("Created at: ", guild!.createdAt.toDateString())
          .setFooter(guild!.id),
      ],
    });
  }
}
