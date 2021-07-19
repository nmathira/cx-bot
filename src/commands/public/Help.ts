import {Command} from "discord-akairo";
import {Message} from "discord.js";

export default class Help extends Command {
  public constructor() {
    super("help", {
      aliases: ["help", "commands"],
      category: "Public Commands",
      description: "gives information on commands",
      ratelimit: 3,
      args: [{
        id: "command",
        type: "commandAlias",
        default: null,
      }],
    });
  }

  public async exec(message: Message, {command}: { command: Command }): Promise<Message | void> {
    if (command) {
      let embed1 = new MessageEmbed()
        .setAuthor(`Help | ${command}`, this.client.user!.displayAvatarURL())
        .setColor("#0079fa")
        .setDescription(`**Description:** \n ${command.description || "No content provided."}`);
      return await message.channel.send({embeds: [embed1]})
    }
    const embed = new MessageEmbed()
      .setAuthor(`Help | ${this.client.user!.username}`, this.client.user!.displayAvatarURL())
      .setColor("RANDOM")
      .setFooter(`${this.client.commandHandler.prefix} help [command] for more information for a command`);
    for (const category of this.handler.categories.values()) {
      if (["default", "Owner", "hidden"].includes(category.id)) continue;

      embed.addField(category.id, category
        .filter(cmd => cmd.aliases.length > 0)
        .map(cmd => `**\`${cmd}\`**`)
        .join(", ") || "No commands in this category,",
      );
    }
    return await message.channel.send({embeds: [embed]});
  }

  // return await message.util!.send("discord-akairo is stupid and changed the stupid code for descriptions in commands")
}
