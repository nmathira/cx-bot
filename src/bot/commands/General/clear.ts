import type { Args } from "@sapphire/framework";
import { PermissionsPrecondition } from "@sapphire/framework";
import { ApplyOptions, RequiresPermissions } from "@sapphire/decorators";
import type { CxCommandOptions } from "@typings/index";
import { CxCommand } from "@lib/extensions/CxCommand";
import type {
  Collection,
  Message,
  NewsChannel,
  Snowflake,
  TextChannel,
  ThreadChannel,
} from "discord.js";

@ApplyOptions<CxCommandOptions>({
  name: "clear",
  aliases: ["clear", "purge", "bulkdelete"],
  category: "Utilities",
  usage: "cx clear [amount]",
  runIn: "guild",
  examples: ["cx clear 1"],
  description: "clears messages in a text channel",
  preconditions: [new PermissionsPrecondition("MANAGE_MESSAGES")],
  detailedDescription:
    "Clears messages that are sent in a Server's Text Channel. Needs ManageMessages to work.",
})
export class Clear extends CxCommand {
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
