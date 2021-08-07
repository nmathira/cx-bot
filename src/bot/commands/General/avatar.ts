import type { AllowedImageSize, Message, User } from "discord.js";
import type { Args } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import type { CxCommandOptions } from "@typings/index";
import { CxCommand } from "@lib/extensions/CxCommand";
import CxEmbed from "@lib/extensions/CxEmbed";

@ApplyOptions<CxCommandOptions>({
  name: "avatar",
  aliases: ["avatar", "av"],
  category: "Utilities",
  usage: "cx avatar",
  examples: ["cx avatar", "cx avatar [user]"],
  description: "shows the avatar of the user passed in.",
  detailedDescription:
    "Shows the avatar of the user passed in, defaulting to the author of the command if no user is passed in.",
})
export class Avatar extends CxCommand {
  async run(message: Message, args: Args): Promise<Message> {
    const size = parseInt(args.getOption("size")) ?? 2048;
    const user: User = await args.pick("user").catch(() => message.author);
    return await message.channel.send({
      embeds: [
        new MessageEmbed()
          .setTitle("Avatar of: " + message.author.username)
          .setImage(user.displayAvatarURL({ size: size as AllowedImageSize })),
      ],
    });
  }
}