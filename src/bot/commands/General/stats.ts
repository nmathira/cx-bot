import { Message, MessageEmbed, version } from "discord.js";
import { ApplyOptions } from "@sapphire/decorators";
import { CxCommand, CxCommandOptions } from "@lib/command/CxCommand";
import { execSync } from "child_process";

@ApplyOptions<CxCommandOptions>({
  name: "stats",
  aliases: ["stats"],
  category: "Utilities",
  usage: "cx stats",
  examples: ["cx stats"],
  description: "sends the ping of CxBot.",
  detailedDescription: "Sends the ping of CxBot's connection to Discord, as well as the ping from Discord.",
})
export class Stats extends CxCommand {
  async run(message: Message): Promise<Message> {
    const embed = new MessageEmbed()
      .setTitle("CxBot's Statistics!")
      .addField("Guilds: ", this.container.client.guilds.cache.size.toString())
      .addField("Users: ", this.container.client.users.cache.size.toString())
      .addField("Commit Hash: ", execSync("git rev-parse HEAD").toString().trim())
      .addField("Memory Usage: ", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${process.memoryUsage().heapTotal / 1024 / 1024}`)
      .addField("Discord.js Version: ", version)
      .addField("NodeJS Version", process.version)
      .addField("Process ID", process.pid.toString());
    return await message.channel.send({embeds: [embed]});
  }
}