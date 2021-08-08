import type { Message } from "discord.js";
import { ApplyOptions } from "@sapphire/decorators";
import type { CxCommandOptions } from "@typings/index";
import { CxCommand } from "@lib/extensions/CxCommand";
import type { Args } from "@sapphire/framework";

@ApplyOptions<CxCommandOptions>({
  category: "Owner",
  description: "unloads the command specified",
  detailedDescription: "Unloads the specified command in CxBot.",
  examples: ["cx unload [command]"],
  preconditions: ["OwnerOnly"],
  usage: "cx unload {command}",
})
export class Reload extends CxCommand {
  async run(message: Message, args: Args): Promise<void> {
    const cmd = await args.pick("string");
    await this.container.stores.get("commands").get(cmd).unload();
    message.channel.send("Unloaded command: " + cmd.toString());
  }
}