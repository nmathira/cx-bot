import { Command } from "discord-akairo"
import { Message, Snowflake } from "discord.js"
import { addUserToSheet } from "../../util/sheets";

export default class AddAll extends Command {
  public constructor() {
    super("addall", {
      aliases: ["addall"],
      description: "Add all roles to the owner role.",
      ownerOnly: true,
    })
  }

  public async exec(message: Message): Promise<void> {
    const guild = message.guild;
    if (!guild.available) return;
    const role = <Snowflake>`${BigInt("853479816136491038")}`;
    let hackers = await guild.members.fetch().then(m => m.filter(m => m.roles.cache.has(role)));
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    for (let hackerArr of hackers) {
      let hacker = hackerArr[1]
      await this.client.points.create({
        discordId: hacker.id,
        location: await addUserToSheet(hacker.id, hacker.displayName),
      });
      console.log(`${hacker.id} added to sheet`);
      await delay(1250);
    }
    console.log("members added to sheet");
  }
}
