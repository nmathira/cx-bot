import { Command } from "@sapphire/framework";
import { Message } from "discord.js";

module.exports = class extends Command {
  constructor(context: any) {
    super(context, {
      name: "ping",
      description: "Send back the ping of the bot"
    });
  }

  async run(message: Message): Promise<Message>{
    const msg = await message.channel.send("you have good eyes?");
    return await msg.edit(
      `Latency ${Math.round(this.container.client.ws.ping)}ms. API Latency ${msg.createdTimestamp - message.createdTimestamp}ms.`
    );
  }
};