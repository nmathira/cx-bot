import {Argument, Command} from "discord-akairo";
import {Message} from "discord.js";

export default class Clear extends Command {
  public constructor() {
    super("clear", {
      aliases: ["clear"],
      channel: "guild",
      category: "Public Commands",
      userPermissions: "MANAGE_MESSAGES",
      clientPermissions: ["MANAGE_MESSAGES"],
      description: {
        content: "Clears the amount of messages specified",
        usage: "clear [amount]",
        examples: [
          "clear",
          "clear [amount]",
        ],
      },
      args: [{
        id: "amount",
        type: Argument.range("number", 1, 99, true),
        default: 1,
      },
      ],
    });
  }

  public async exec(message: Message, {amount}: { amount: number }): Promise<void | Message> {
    // @ts-ignore
    return await message.channel.bulkDelete(amount + 1, true).catch((reason: any) => console.log(reason));
  }
}
