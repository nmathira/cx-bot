//shut up shut up shut up
/* eslint-disable indent */
import type { Args } from "@sapphire/framework";
import type { Message } from "discord.js";
import { ApplyOptions } from "@sapphire/decorators";
import type { CxCommandOptions } from "@typings/index";
import CxCommand from "@lib/extensions/CxCommand";
import CxEmbed from "@lib/extensions/CxEmbed";
import { send } from "@sapphire/plugin-editable-commands";

@ApplyOptions<CxCommandOptions>({
  aliases: ["commands"],
  description: "shows what commands in CxBot do.",
  detailedDescription:
    "Shows information on CxBot's commands and how to use them.",
  examples: ["cx help", "cx help ping"],
  usage: "cx help [command]",
})
export default class Ping extends CxCommand {
  async messageRun(message: Message, args: Args): Promise<Message> {
    if (args.finished) {
      return message.channel.send({ embeds: [this.sortAllCommands()] });
    } else {
      const arg = await args.pick("string");
      // if (!this.container.stores.has(arg)) return message.channel.send("That command doesn't exist!");
      const command = this.container.stores
        .get("commands")
        .get(arg) as CxCommand;
      return send(message, {
        embeds: [
          new CxEmbed()
            .setTitle(`Help | ${command.name}`)
            .setDescription(command.detailedDescription)
            .addField("Category: ", command.category)
            .addField("Aliases: ", command.aliases.toString())
            .addField(
              "Usages: ",
              command.usage ? command.usage : "No Usage Provided.",
            )
            .addField(
              "Examples: ",
              !command["examples"]
                ? "No Examples Provided."
                : command["examples"]
                    .map((example: string) => `\`${example}\``)
                    .toString(),
            ),
        ],
      });
    }
  }

  private sortAllCommands() {
    const allCommands = this.container.stores
      .get("commands")
      .reduce((acc, curr: CxCommand) => {
        if (["Owner"].includes(curr.category)) return acc;
        if (Reflect.has(acc, curr.category)) acc[curr.category].push(curr);
        else acc[curr.category] = [curr];
        return acc;
      }, {} as Record<string, CxCommand[]>);

    const embed = new CxEmbed().setTitle("Help | All");
    for (const [category, commands] of Object.entries(allCommands)) {
      embed.addField(
        "**" + category + "**",
        commands.map(cmd => `\`${cmd.name}\``).join(", "),
      );
    }
    return embed.setFooter(
      "cx  help [command] for more information for a command",
    );
  }
}
