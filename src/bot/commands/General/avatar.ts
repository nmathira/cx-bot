import type { AllowedImageSize, Message, User } from "discord.js";
import type { Args } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import type { CxCommandOptions } from "@typings/index";
import CxCommand from "@lib/extensions/CxCommand";
import CxEmbed from "@lib/extensions/CxEmbed";
import { send } from "@sapphire/plugin-editable-commands";

@ApplyOptions<CxCommandOptions>({
  aliases: ["av"],
  description: "shows the avatar of the user passed in.",
  detailedDescription:
    "Shows the avatar of the user passed in, defaulting to the author of the command if no user is passed in.",
  examples: ["cx avatar", "cx avatar [user]"],
  usage: "cx avatar",
})
export default class Avatar extends CxCommand {
  public async messageRun(message: Message, args: Args): Promise<Message> {
    //le lazy problem solver
    const size = parseInt(args.getOption("size") ?? "2048") ?? 2048;
    const user: User = await args.pick("user").catch(() => message.author);
    return await send(message, {
      embeds: [
        new CxEmbed().setTitle("Avatar of: " + user.username).setImage(
          user.displayAvatarURL({
            size: size as AllowedImageSize,
            dynamic: true,
          }),
        ),
      ],
    });
  }
}
