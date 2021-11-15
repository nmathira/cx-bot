import type { PieceContext } from "@sapphire/framework";
import { container, Listener } from "@sapphire/framework";
import { Message } from "discord.js";

export default class onMessage extends Listener {
  public constructor(context: PieceContext) {
    super(context);
  }

  public run(message: Message): Promise<Message> {
    if ((message.guildId = "893383816402575401")) {
      if (message.content.includes("fr")) return message.channel.send("ong");
      if (message.content.includes("ong") && !message.author.bot)
        return message.channel.send("no cap");
    }
  }
}
