import {Command, Listener} from "discord-akairo";
import {Message, MessageEmbed} from "discord.js";

export default class ErrorListener extends Listener {
  public constructor() {
    super("commandError", {
      emitter: "commandHandler",
      event: "error",
    });
  }

  public async exec(error: Error, message: Message, command ?: Command): Promise<Message> {
    let owner = await this.client.users.fetch("" + this.client.ownerID);
    let embed = new MessageEmbed()
      .setTitle("AYO Boss man, fix your code!!")
      .addField("Command that broke: ", command)
      .addField("Who ran it (He is a DumbAss): ", message.author.username)
      .addField("Where it was run: ", message.guild ?? message.channel)
      .addField("ran command: ", message)
      .addField("Error type", error.name)
      .addField("Error message", error.message)
    await owner.send(embed);
    await owner.send(`The Error's stacktrace: \`\`\` ${error.stack}\`\`\``);
    return await message.util!.send("An unexpected error occurred. My owner has been notified.");
  }
}
