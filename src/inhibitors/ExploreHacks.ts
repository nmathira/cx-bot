import {Command, Inhibitor} from "discord-akairo";
import {Message} from "discord.js";

export default class ExploreHacksInhibitor extends Inhibitor {
  public constructor() {
    super("explorehacksExclusivity", {
      reason: "explorehacks",
    });
  }

  public async exec(message: Message, command: Command) {
    return false;
  }
}
