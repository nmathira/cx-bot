import type { Args } from "@sapphire/framework";
import { ApplyOptions, RequiresPermissions } from "@sapphire/decorators";
import type { CxCommandOptions } from "@typings/index";
import CxCommand from "@lib/extensions/CxCommand";
import type {
  Collection,
  Message,
  NewsChannel,
  Snowflake,
  TextChannel,
  ThreadChannel,
} from "discord.js";

@ApplyOptions<CxCommandOptions>({
  aliases: ["purge", "bulkdelete"],
  category: "Utilities",
  description: "clears messages in a text channel",
  detailedDescription:
    "Clears messages that are sent in a Server's Text Channel. Needs ManageMessages to work.",
  examples: ["cx clear 1"],
  preconditions: ["OwnerOnly"],
  runIn: ["GUILD_ANY"],
  usage: "cx clear [amount]",
})
export default class Clear extends CxCommand {
  @RequiresPermissions("MANAGE_MESSAGES")
  public async run(
    message: Message,
    args: Args
  ): Promise<Message | Collection<Snowflake, Message>> {
    const number = await args.pick("number", { maximum: 99, minimum: 0 });
    const channel = message.channel as
      | TextChannel
      | NewsChannel
      | ThreadChannel;
    return await channel.bulkDelete(number);
  }
}
