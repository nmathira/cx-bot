import { CxCommand, CxCommandOptions } from "@lib/command/CxCommand";
import { ApplyOptions } from "@sapphire/decorators";
import { Message } from "discord.js";

@ApplyOptions<CxCommandOptions>({
  name: "logout",
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