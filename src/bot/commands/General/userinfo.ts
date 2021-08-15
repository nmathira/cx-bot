import type { Message } from "discord.js";
import { ApplyOptions } from "@sapphire/decorators";
import type { CxCommandOptions } from "@typings/index";
import CxCommand from "@lib/extensions/CxCommand";
import type { Args } from "@sapphire/framework";
import CxEmbed from "@lib/extensions/CxEmbed";

@ApplyOptions<CxCommandOptions>({
  aliases: ["ui"],
  category: "Utilities",
  description: "Gets information about a user.",
  detailedDescription:
    "Gets information about a user, if no arguments are passed in, it will default to the message author.",
  examples: ["cx userinfo", "cx userinfo [user]"],
  usage: "cx userinfo",
})
export class Userinfo extends CxCommand {
  async run(message: Message, args: Args): Promise<Message> {
    const member = await args.pick("member").catch(() => message.member);
    const user = member.user;
    return message.channel.send({
      embeds: [
        new CxEmbed()
          .setTitle("Info about: " + user.tag)
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .addField("mention: ", user.toString())
          .addField("Created at: ", user.createdAt.toDateString(), true)
          .addField("Joined at: ", member.joinedAt.toDateString(), true)
          .setColor(member.roles.highest.color)
          .setFooter(user.id),
      ],
    });
  }
}
