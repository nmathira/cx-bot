import type { Message } from "discord.js";
import { ApplyOptions } from "@sapphire/decorators";
import type { CxCommandOptions } from "@typings/index";
import CxCommand from "@lib/extensions/CxCommand";
import { send } from "@sapphire/plugin-editable-commands";

@ApplyOptions<CxCommandOptions>({
  aliases: ["hello"],
  description: "Say hi to CxBot!",
  detailedDescription: "Say Hi to CxBot!",
  examples: ["cx hi"],
  usage: "cx hi",
})
export default class Hi extends CxCommand {
  async messageRun(message: Message): Promise<Message> {
    return await send(message, "Hi");
  }
}
