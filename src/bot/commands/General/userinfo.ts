import type { Message } from "discord.js";
import { MessageEmbed } from "discord.js";
import { ApplyOptions } from "@sapphire/decorators";
import type { CxCommandOptions } from "@lib/command/CxCommand";
import { CxCommand } from "@lib/command/CxCommand";
import type { Args } from "@sapphire/framework";

@ApplyOptions<CxCommandOptions>({
  name: "userinfo",
  aliases: ["userinfo", "ui"],
  category: "Utilities",
  usage: "cx userinfo",
  examples: ["cx userinfo", "cx userinfo [user]"],
  description: "Gets information about a user.",
  detailedDescription:
    "Gets information about a user, if no arguments are passed in, it will default to the message author.",
})
export class Userinfo extends CxCommand {
  async run(message: Message, args: Args): Promise<Message> {
    const user = await args.pick("user").catch(() => message.author);
    return message.channel.send({
      embeds: [
        new MessageEmbed()
          .setAuthor(user.username, user.displayAvatarURL())
          .setTitle("Info about: " + user.tag)
          .setThumbnail(user.displayAvatarURL())
          .addField("mention: ", user.toString())
          .addField("Created at: ", user.createdAt.toUTCString())
          .setFooter(user.id)
          .setTimestamp(Date.now()),
      ],
    });
  }
}