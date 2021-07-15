import {Command, Listener} from "discord-akairo";
import {Message, MessageEmbed, Snowflake} from "discord.js";

export default class ErrorListener extends Listener {
  public constructor() {
    super("commandError", {
      emitter: "commandHandler",
      event: "error",
    });
  }

  public async exec(error: Error, message: Message, command ?: Command): Promise<Message> {
    let owner = await this.client.users.fetch(<Snowflake>this.client.ownerID);
    let embed = new MessageEmbed()
      .setTitle("AYO Boss man, fix your code!!")
      .addField("Command that broke: ", command!.id)
      .addField("Who ran it (He is a DumbAss): ", message.author.username)
      .addField("ran command: ", message.content)
      .addField("Error type", error.name)
      .addField("Error message", error.message)
    await owner.send({
      content: `The Error's stacktrace: \`\`\` ${error.stack}\`\`\``,
      embeds: [embed],
    })
    return await message.util!.send("An unexpected error occurred. My owner has been notified.");
  }
}
