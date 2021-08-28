import type { Message } from "discord.js";
import { ApplyOptions } from "@sapphire/decorators";
import type { CxCommandOptions } from "@typings/index";
import CxCommand from "@lib/extensions/CxCommand";

@ApplyOptions<CxCommandOptions>({
  category: "Owner",
  description: "Loads all the commands in fs",
  detailedDescription: "Loads all of the commands in the commands folder",
  examples: ["cx load"],
  preconditions: ["OwnerOnly"],
  usage: "cx load",
})
export default class Reload extends CxCommand {
  async run(message: Message): Promise<Message> {
    for (const store of this.container.stores.values()) {
      await store.loadAll();
    }
    return await message.channel.send("All Pieces loaded!");
  }
}
