import type { Message } from "discord.js";
import { MessageEmbed } from "discord.js";
import { ApplyOptions } from "@sapphire/decorators";
import type { CxCommandOptions } from "@typings/index";
import CxCommand from "@lib/extensions/CxCommand";
import { safeExec } from "@lib/utils/util";
import { codeBlock } from "@sapphire/utilities";

@ApplyOptions<CxCommandOptions>({
  aliases: ["tsc"],
  category: "Owner",
  usage: "cx compile",
  examples: ["cx compile"],
  preconditions: ["OwnerOnly"],
  description: "compiles cxbot",
  detailedDescription: "Compiles CxBot's typescript code into runnable code.",
})
export default class Compile extends CxCommand {
  async run(message: Message): Promise<Message> {
    const { stderr } = await safeExec("npx tsc");
    console.log(stderr);
    const embed = new MessageEmbed()
      .setTitle(stderr === "" ? "Compilation succeded!" : "Compilation Failed!")
      .setDescription(
        stderr === ""
          ? "The core of CxBot has been backed up in memory, and will still function normally. However, if there were any breaking changes in the previous versions, make sure to restart me at your earliest convinience!"
          : codeBlock("bash", stderr)
      );
    return message.channel.send({ embeds: [embed] });
  }
}