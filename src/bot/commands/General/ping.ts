import type { Message } from "discord.js";
import { ApplyOptions } from "@sapphire/decorators";
import type { CxCommandOptions } from "@typings/index";
import CxCommand from "@lib/extensions/CxCommand";
import { send } from "@sapphire/plugin-editable-commands";

@ApplyOptions<CxCommandOptions>({
  description: "sends the ping of CxBot.",
  detailedDescription:
    "Sends the ping of CxBot's connection to Discord, as well as the ping from Discord.",
  examples: ["cx ping"],
  usage: "cx ping",
})
export default class Ping extends CxCommand {
  async messageRun(message: Message): Promise<Message> {
    const msg = await message.channel.send("you have good eyes?");
    return await msg.edit(
      `Heartbeat: ${Math.round(this.container.client.ws.ping)}ms. API Latency ${
        msg.createdTimestamp - message.createdTimestamp
      }ms.`,
    );
  }
}
