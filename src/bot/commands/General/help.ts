/* eslint-disable */
import type { Args } from "@sapphire/framework";
import type { Message } from "discord.js";
import { ApplyOptions } from "@sapphire/decorators";
import type { CxCommandOptions } from "@typings/index";
import CxCommand from "@lib/extensions/CxCommand";
import CxEmbed from "@lib/extensions/CxEmbed";

@ApplyOptions<CxCommandOptions>({
  aliases: ["commands"],
  category: "Utilities",
  description: "shows what commands in CxBot do.",
  detailedDescription:
    "Shows information on CxBot's commands and how to use them.",
  examples: ["cx help", "cx help ping"],
  usage: "cx help [command]",
})
export class Ping extends CxCommand {
  async run(message: Message, args: Args): Promise<Message> {
    if (args.finished) {
      const allCommands = this.container.stores
        .get("commands")
        .reduce((acc, curr) => {
          if (["Owner"].includes(curr.category)) return acc;
          if (Reflect.has(acc, curr.category)) acc[curr.category].push(curr);
          else acc[curr.category] = [curr];
          return acc;
        }, {} as Record<string, CxCommand[]>);
      const embed = new CxEmbed().setTitle("Help | All");

      for (const [category, commands] of Object.entries(allCommands)) {
        embed.addField(
          "**" + category + "**",
          commands.map((cmd) => `\`${cmd.name}\``).join(", ")
        );
      }
      embed.setFooter("cx  help [command] for more information for a command");
      return message.channel.send({ embeds: [embed] });
    } else {
      const command = this.container.stores
        .get("commands")
        .get(await args.pick("string")) as CxCommand;
      return message.channel.send({
        embeds: [
          new CxEmbed()
            .setTitle(`Help | ${command.name}`)
            .setDescription(command.detailedDescription)
            .addField("Category: ", command.category)
            .addField("Aliases: ", command.aliases.toString())
            .addField(
              "Usages: ",
              command.usage ? command.usage : "No Usage Provided."
            )
            .addField(
              "Examples: ",
              command["examples"]
                ? command["examples"]
                    .map((example: string) => `\`${example}\``)
                    .toString()
                : "No Examples Provided."
            ),
        ],
      });
    }
  }
}