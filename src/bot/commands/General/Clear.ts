import { Args } from "@sapphire/framework";
import { ApplyOptions, RequiresPermissions } from "@sapphire/decorators";
import { CxCommand, CxCommandOptions } from "@lib/command/CxCommand";
import { Collection, Message, Snowflake } from "discord.js";

@ApplyOptions<CxCommandOptions>({
  name: "clear",
  aliases: ["clear", "purge", "bulkdelete"],
  category: "Utilities",
  usage: "cx clear [amount]",
  runIn: "guild",
  examples: ["cx clear 1"],
})
export class Clear extends CxCommand {
  @RequiresPermissions("MANAGE_MESSAGES")
  public async run(message: Message, args: Args): Promise<Message | Collection<Snowflake, Message>> {
    const number = await args.pick("number", {maximum: 99, minimum: 0});
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return await message.channel.bulkDelete(number);
  }
}