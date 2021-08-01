import { Message } from "discord.js";
import { ApplyOptions } from "@sapphire/decorators";
import { CxCommand, CxCommandOptions } from "@lib/command/CxCommand";

@ApplyOptions<CxCommandOptions>({
  name: "hi",
  aliases: ["hi", "hello"],
  category: "General",
  usage: "cx hi",
  examples: ["cx hi"],
  description: "Say hi to CxBot!",
  detailedDescription: "Say Hi to CxBot!",
})
export class Ping extends CxCommand {
  async run(message: Message): Promise<Message> {
    return await message.channel.send("Hi");
  }
}