import { Command } from "discord-akairo";
import { Message } from "discord.js";


export default class LoadCommand extends Command {
  public constructor() {
    super("reload", {
      ownerOnly: true,
      aliases: ["reload", "restart"],
      category: "Owner",
      args: [{
        id: "command",
        type: "command",
      }],
    });
  }

  public async exec(message: Message, {command}: { command: Command }): Promise<Message | Command> {
    this.handler.remove(command.id);
    this.handler.load(command.id);
    return message.reply(`Reloaded command \`${command}\``)
  }
}
