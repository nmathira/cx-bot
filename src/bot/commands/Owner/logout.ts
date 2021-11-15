import type { CxCommandOptions } from "@typings/index";
import CxCommand from "@lib/extensions/CxCommand";
import { ApplyOptions } from "@sapphire/decorators";
import type { Message } from "discord.js";

@ApplyOptions<CxCommandOptions>({
  description: "makes bot go offline",
  detailedDescription: "Stops.",
  examples: ["cx reload", "cx reload [command]"],
  preconditions: ["OwnerOnly"],
  usage: "cx reload {command}",
  aliases: ["sleep", "shutdown"],
})
export default class Logout extends CxCommand {
  public async messageRun(message: Message): Promise<void> {
    await message.channel.send("cya");
    process.exit(0);
  }
}
