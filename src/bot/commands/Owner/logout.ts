import type { CxCommandOptions } from "@typings/index";
import { CxCommand } from "@lib/extensions/CxCommand";
import { ApplyOptions } from "@sapphire/decorators";
import type { Message } from "discord.js";

@ApplyOptions<CxCommandOptions>({
  aliases: ["sleep", "shutdown"],
  category: "Owner",
})
export class Logout extends CxCommand {
  public async run(message: Message): Promise<void> {
    await message.channel.send("cya");
    this.container.client.destroy();
    process.exit(0);
  }
}