import { Command, Listener } from "discord-akairo";
import { Message } from "discord.js";

export default class CommandBlocked extends Listener {
  public constructor() {
    super("commandBlocked", {
      emitter: "commandHandler",
      event: "commandBlocked",
    });
  }

  public async exec(message: Message, command: Command, reason: string): Promise<Message> {
    return message.util!.reply(`You are blocked from using ${command.id} because of ${reason}`)
  }
}
