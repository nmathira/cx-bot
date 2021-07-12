import {Command} from "discord-akairo";
import {Message, MessageEmbed} from "discord.js";

export default class Ping extends Command {
  public constructor() {
    super("ping", {
      aliases: ["ping"],
      category: "Public Commands",
      description: {
        content: "Check latency between the bot and the Discord API",
        usage: "ping",
        examples: ["ping"],
      },
      ratelimit: 3,
    });
  }

  public async exec(message: Message): Promise<Message> {
    const sent = await message.util!.send("you have good eyes!");
    const timeDiff: number = (sent.editedAt?.getTime() || sent.createdAt.getTime()) - (message?.editedAt?.getTime() || message.createdAt.getTime());

    let embed = new MessageEmbed()
      .addField("RTT:", String(timeDiff))
      .addField("Ping:", String(this.client.ws.ping));
    return await message.util!.send({embeds: [embed]},
    );
  }
}
