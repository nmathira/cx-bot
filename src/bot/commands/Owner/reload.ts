import { Message } from "discord.js";
import { ApplyOptions } from "@sapphire/decorators";
import { CxCommand, CxCommandOptions } from "@lib/command/CxCommand";
import { Args } from "@sapphire/framework";

@ApplyOptions<CxCommandOptions>({
  name: "reload",
  aliases: ["reload"],
  category: "Owner",
  usage: "cx reload {command}",
  examples: ["cx reload", "cx reload [command]"],
  description: "reloads the command specified",
  preconditions: ["OwnerOnly"],
  detailedDescription: "Sends the ping of CxBot's connection to Discord, as well as the ping from Discord.",
})
export class Reload extends CxCommand {
  async run(message: Message, args: Args): Promise<void> {
    return this.container.stores.get("commands").get(await args.pick("string")).reload();
  }
}
