import type { CxCommandOptions } from "@typings/index";
import CxCommand from "@lib/extensions/CxCommand";
import { ApplyOptions } from "@sapphire/decorators";
import type { Message } from "discord.js";

@ApplyOptions<CxCommandOptions>({
  category: "Owner",
  preconditions: ["OwnerOnly"],
})
export default class testdb extends CxCommand {
  public async run(message: Message): Promise<Message> {
    const database = await this.container.database.trelloUser.findMany();
    console.log(database);
    return await message.channel.send("db results:" + database[0]);
  }
}
