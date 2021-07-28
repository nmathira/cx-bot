import { Command, Listener } from "discord-akairo";
import { Message } from "discord.js";

export default class missingPermissions extends Listener {
  public constructor() {
    super("missingPermissions", {
      emitter: "commandHandler",
      event: "missingPermissions",
    });
  }

  public async exec(message: Message, command: Command, reason: string): Promise<Message> {
    return await message.util!.reply(`You don't have the required permissions to run ${command.id}`);
  }
}
