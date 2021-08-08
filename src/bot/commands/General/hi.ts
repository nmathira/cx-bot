import type { Message } from "discord.js";
import { ApplyOptions } from "@sapphire/decorators";
import type { CxCommandOptions } from "@typings/index";
import CxCommand from "@lib/extensions/CxCommand";

@ApplyOptions<CxCommandOptions>({
  aliases: ["hello"],
  category: "General",
  description: "Say hi to CxBot!",
  detailedDescription: "Say Hi to CxBot!",
  examples: ["cx hi"],
  usage: "cx hi",
})
export class Hi extends CxCommand {
  async run(message: Message): Promise<Message> {
    return await message.channel.send("Hi");
  }
}