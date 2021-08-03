import type { Message } from "discord.js";
import { MessageEmbed, version } from "discord.js";
import { ApplyOptions } from "@sapphire/decorators";
import type { CxCommandOptions } from "@lib/command/CxCommand";
import { CxCommand } from "@lib/command/CxCommand";
import { execSync } from "child_process";

@ApplyOptions<CxCommandOptions>({
  name: "stats",
  aliases: ["stats"],
  category: "Utilities",
  usage: "cx stats",
  examples: ["cx stats"],
  description: "sends the ping of CxBot.",
  detailedDescription:
    "Sends the ping of CxBot's connection to Discord, as well as the ping from Discord.",
})
export class Stats extends CxCommand {
  async run(message: Message): Promise<Message> {
    const embed = new MessageEmbed()
      .setTitle("CxBot's Invite!")
      .setURL(
        this.container.client.generateInvite({
          scopes: ["bot"],
          permissions: ["ADMINISTRATOR"],
        })
      )
      .addField(
        "Guilds: ",
        this.container.client.guilds.cache.size.toString(),
        true
      )
      .addField(
        "Users: ",
        this.container.client.users.cache.size.toString(),
        true
      )
      .addField("Discord.js", version.split("t")[0], true)
      .addField("NodeJS", process.version, true)
      .addField(
        "Memory Usage: ",
        `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MiB / ${(
          process.memoryUsage().heapTotal /
          1024 /
          1024
        ).toFixed(2)} MiB`,
        true
      )
      .setFooter(
        `PID: ${process.pid.toString()} | ${execSync(
          "git rev-parse --short HEAD"
        )
          .toString()
          .trim()} | `
      )
      .setTimestamp(Date.now());
    return await message.channel.send({ embeds: [embed] });
  }
}
