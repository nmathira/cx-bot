import type { Message, Snowflake } from "discord.js";
import { version } from "discord.js";
import { ApplyOptions } from "@sapphire/decorators";
import type { CxCommandOptions } from "@typings/index";
import { CxCommand } from "@lib/extensions/CxCommand";
import { execSync } from "child_process";
import CxEmbed from "@lib/extensions/CxEmbed";

@ApplyOptions<CxCommandOptions>({
  category: "Utilities",
  description: "sends the ping of CxBot.",
  detailedDescription:
    "Sends the ping of CxBot's connection to Discord, as well as the ping from Discord.",
  examples: ["cx stats"],
  usage: "cx stats",
})
export class Stats extends CxCommand {
  async run(message: Message): Promise<Message> {
    const embed = new CxEmbed()
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
      .addField("Discord.js", "v" + version.split("-")[0], true)
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
          .trim()} `
      );
    return await message.channel.send({ embeds: [embed] });
  }
}