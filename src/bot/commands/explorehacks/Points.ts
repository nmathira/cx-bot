import {Command} from "discord-akairo";
import {Message} from "discord.js";

export default class ExplorePoints extends Command {
  constructor() {
    super("explorepoints", {
      aliases: ["exp"],
      category: "Explore Hacks",
      description: {
        content: "DM's the user how many explore points they have.",
        usage: "exp",
        examples: [
          "exp",
        ],
      },
    });
  }

  public async exec(message: Message): Promise<any> {
    return await message.author.send("yea");
  }
}
