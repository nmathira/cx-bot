import type { Message } from "discord.js";
import { ApplyOptions } from "@sapphire/decorators";
import type { CxCommandOptions } from "@typings/index";
import { CxCommand } from "@lib/extensions/CxCommand";

@ApplyOptions<CxCommandOptions>({
  name: "reload",
  aliases: ["reload"],
  category: "Owner",
  usage: "cx reload {command}",
  examples: ["cx reload", "cx reload [command]"],
  description: "reloads the command specified",
  preconditions: ["OwnerOnly"],
  detailedDescription:
    "Sends the ping of CxBot's connection to Discord, as well as the ping from Discord.",
})
export class Reload extends CxCommand {
  async run(message: Message): Promise<Message> {
    await this.container.stores.get("commands").loadAll();
    return await message.channel.send("All commands loaded!");
  }
}
