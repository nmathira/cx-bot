import type { Message } from "discord.js";
import { ApplyOptions } from "@sapphire/decorators";
import type { CxCommandOptions } from "@typings/index";
import { CxCommand } from "@lib/extensions/CxCommand";
import type { Args } from "@sapphire/framework";

@ApplyOptions<CxCommandOptions>({
  name: "unload",
  aliases: ["unload"],
  category: "Owner",
  usage: "cx unload {command}",
  examples: ["cx unload", "cx unload [command]"],
  description: "unloads the command specified",
  preconditions: ["OwnerOnly"],
  detailedDescription: "Unloads the specified command in CxBot.",
})
export class Reload extends CxCommand {
  async run(message: Message, args: Args): Promise<void> {
    return this.container.stores
      .get("commands")
      .get(await args.pick("string"))
      .unload();
  }
}
