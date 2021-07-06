import {Command} from "discord-akairo";
import {Message, MessageEmbed} from "discord.js";

export default class Help extends Command {
  public constructor() {
    super("help", {
      aliases: ["help", "commands"],
      category: "Public Commands",
      description: {
        content: "view available commands",
        usage: "help [command]",
        examples: [
          "help",
          "help ping",
        ],
      },
      ratelimit: 3,
      args: [{
        id: "command",
        type: "commandAlias",
        default: null,
      }],
    });
  }

  public async exec(message: Message, {command}: { command: Command }): Promise<Message> {
    if (command) {
      return await message.channel.send(new MessageEmbed()
        .setAuthor(`Help | ${command}`, this.client.user!.displayAvatarURL())
        .setColor("#0079fa")
        .setDescription(`
                **Description:**\n
                ${command.description.content || "No content provided."}
                
                **Usage:**
                ${command.description.usage || "No usage provided."}
                
                **Examples:**
                ${command.description.examples ? command.description.examples.map((example: string) => `\`${example}\``).join("\n") : "No Example Provided"}
                `),
      )
    }
    const embed = new MessageEmbed()
      .setAuthor(`Help | ${this.client.user!.username}`, this.client.user!.displayAvatarURL())
      .setColor("RANDOM")
      .setFooter(`${this.client.commandHandler.prefix} help [command] for more information for a command`);
    for (const category of this.handler.categories.values()) {
      if (["default"].includes(category.id)) continue;
      if (["Explore Hacks"].includes(category.id)) continue;
      if (["Owner"].includes(category.id)) continue;

      embed.addField(category.id, category
        .filter(cmd => cmd.aliases.length > 0)
        .map(cmd => `**\`${cmd}\`**`)
        .join(", ") || "No commands in this category,",
      );

    }
    return await message.channel.send(embed);
  }
}
