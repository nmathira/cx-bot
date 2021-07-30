import { Args, Command } from "@sapphire/framework";
import {
  ApplyOptions,
  RequiresGuildContext,
  RequiresPermissions,
} from "@sapphire/decorators";
import { CxCommand, CxCommandOptions } from "@lib/command/CxCommand";
import { Message, TextChannel } from "discord.js";

@ApplyOptions<CxCommandOptions>({
  name: "clear",
  aliases: ["clear", "purge", "bulkdelete"],
  category: "Utilities",
  usage: "cx clear [amount]",
  runIn: "guild",
  examples: "cx clear 1",
})
export class Clear extends CxCommand {
  @RequiresPermissions("MANAGE_MESSAGES")
  @RequiresGuildContext()
  public async run(message: Message, args: Args): Promise<any> {
    const number = await args.pick("number", {maximum: 99, minimum: 0});
    if (message.channel instanceof TextChannel) await message.channel.bulkDelete(number, true);
    else await message.channel.send("I can't delete that many messages!");
  }
}