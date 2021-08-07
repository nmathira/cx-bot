import type { Message } from "discord.js";
import { ApplyOptions } from "@sapphire/decorators";
import type { CxCommandOptions } from "@typings/index";
import { CxCommand } from "@lib/extensions/CxCommand";

@ApplyOptions<CxCommandOptions>({
  name: "ping",
  aliases: ["ping"],
  category: "Utilities",
  usage: "cx ping",
  examples: ["cx ping"],
  description: "sends the ping of CxBot.",
  detailedDescription:
    "Sends the ping of CxBot's connection to Discord, as well as the ping from Discord.",
})
export class Ping extends CxCommand {
  async run(message: Message): Promise<Message> {
    const msg = await message.channel.send("you have good eyes?");
    return await msg.edit(
      `Latency ${Math.round(this.container.client.ws.ping)}ms. API Latency ${
        msg.createdTimestamp - message.createdTimestamp
      }ms.`
    );
  }
}
