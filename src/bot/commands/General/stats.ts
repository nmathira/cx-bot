import type { Message } from "discord.js";
import { version } from "discord.js";
import { ApplyOptions } from "@sapphire/decorators";
import type { CxCommandOptions } from "@typings/index";
import CxCommand from "@lib/extensions/CxCommand";
import CxEmbed from "@lib/extensions/CxEmbed";
import { safeExec } from "@lib/utils/util";

@ApplyOptions<CxCommandOptions>({
  description: "sends the ping of CxBot.",
  detailedDescription:
    "Sends the ping of CxBot's connection to Discord, as well as the ping from Discord.",
  examples: ["cx stats"],
  usage: "cx stats",
})
export default class Stats extends CxCommand {
  async messageRun(message: Message): Promise<Message> {
    const embed = new CxEmbed()
      .setTitle("CxBot's Invite!")
      .setURL(
        this.container.client.generateInvite({
          scopes: ["bot"],
          permissions: ["ADMINISTRATOR"],
        }),
      )
      .addField(
        "Guilds: ",
        this.container.client.guilds.cache.size.toString(),
        true,
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
        true,
      )
      .setFooter(
        `PID: ${process.pid.toString()} | ${
          (await safeExec("git rev-parse --short HEAD")).stdout
        }`,
      );
    return await message.channel.send({ embeds: [embed] });
  }
}
