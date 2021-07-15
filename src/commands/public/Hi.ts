import {Message} from "discord.js";
import {Command} from "discord-akairo";

export default class Hi extends Command {
  public constructor() {
    super("hi", {
      aliases: ["hi", "hello"],
      category: "Public Commands",
      // description: {
      //   content: "say hi to cxbot and have cxbot say hi back",
      //   usage: "hi",
      //   examples: [
      //     "hi",
      //   ],
      // },
      ratelimit: 0,
    });
  }

  public async exec(message: Message): Promise<Message> {
    return await message.util!.send("hi");
  }
}

