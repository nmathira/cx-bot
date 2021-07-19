import {Command} from "discord-akairo";
import {Message, MessageEmbed} from "discord.js";

export default class ExplorePoints extends Command {
  constructor() {
    super("explorepoints", {
      aliases: ["exp"],
      category: "Explore Hacks",
      description: "Check your current Explore Points. **NEEDS USER TO HAVE *allow direct messages from server members* enabled**",
    });
  }

  public async exec(message: Message): Promise<any> {
    let points = 100;
    let embed = new MessageEmbed()
      .addField("Points", `${message.author.id} has ${points} points.`)
    return await message.author.send("yea");
  }
}
