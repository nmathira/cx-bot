import type { Args } from "@sapphire/framework";
import type { Message } from "discord.js";
import { MessageEmbed } from "discord.js";
import { ApplyOptions } from "@sapphire/decorators";
import type { CxCommandOptions } from "@lib/command/CxCommand";
import { CxCommand } from "@lib/command/CxCommand";

@ApplyOptions<CxCommandOptions>({
  name: "help",
  aliases: ["help", "commands"],
  category: "Utilities",
  usage: "cx help [command]",
  examples: ["cx help", "cx help ping"],
  description: "shows what commands in CxBot do.",
  detailedDescription:
    "Shows information on CxBot's commands and how to use them.",
})
export class Ping extends CxCommand {
  async run(message: Message, args: Args): Promise<Message> {
    if (!args.finished) {
      const command = this.container.stores
        .get("commands")
        .get(await args.pick("string")) as CxCommand;
      return message.channel.send({
        embeds: [
          new MessageEmbed()
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
              command.examples
                ? command.examples
                    .map((example: string) => `\`${example}\``)
                    .toString()
                : "No Examples Provid,ed."
            ),
        ],
      });
    } else {
      const thing = this.container.stores
        .get("commands")
        .filter((command) => !["Owner"].includes(command.category));
      const embed = new MessageEmbed();
      embed.setDescription(thing.aliases.array.toString());
      return message.channel.send({ embeds: [embed] });
    }
  }
}
