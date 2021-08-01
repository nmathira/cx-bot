import { Message } from "discord.js";
import { ApplyOptions } from "@sapphire/decorators";
import { CxCommand, CxCommandOptions } from "@lib/command/CxCommand";

@ApplyOptions<CxCommandOptions>({
  name: "reloadall",
  aliases: ["reloadall", "rall"],
  category: "Owner",
  usage: "cx reload {command}",
  examples: ["cx reload", "cx reload [command]"],
  preconditions: ["OwnerOnly"],
  description: "reloads the command specified",
  detailedDescription: "Sends the ping of CxBot's connection to Discord, as well as the ping from Discord.",
})
export class Reload extends CxCommand {
  async run(message: Message): Promise<Message> {
    this.container.stores.get("commands").forEach(cmd => {
      cmd.reload();
    });
    return await message.channel.send("All commands reloaded!");
  }
}