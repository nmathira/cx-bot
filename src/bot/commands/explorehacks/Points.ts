import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import { getDataFromSheet } from "../../../util/sheets";

export default class ExplorePoints extends Command {
  constructor() {
    super("explorepoints", {
      aliases: ["exp", "points", "explorepoints"],
      category: "Explore Hacks",
      description: "Check your current Explore Points. **NEEDS USER TO HAVE *allow direct messages from server members* enabled**",
    });
  }

  public async exec(message: Message): Promise<Message | void> {
    const loc = await (await this.client.points.findOne({where: {discordId: message.author.id}})).get("location") as number;
    let points = await getDataFromSheet(loc)
    const embed = new MessageEmbed().addField("Explore Points", points[0][2]);
    return await message.author.send({embeds: [embed]});
  }
}
