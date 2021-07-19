import { GuildMember, Message } from "discord.js";
import { Command } from "discord-akairo";
import { addUserToSheet } from "../../util/sheets";

export default class FillSheet extends Command {
  public constructor() {
    super("adduser", {
      aliases: ["adduser"],
      category: "hidden",
      args: [{
        id: "user",
        type: "member",
        match: "rest",
        prompt: {
          start: "Who would you like to add to the database?",
          retry: "That\'s not a valid member! Try again.",
        },
      }],
    });
  }

  public async exec(message: Message, {member}: { member: GuildMember }): Promise<Message> {
    let loc = await addUserToSheet(message.author.id, message.author.username);
    await this.client.points.create({
      discordId: message.author.id,
      location: loc,
    })
    return message.util.send(`Added user to row ${loc}`);
  }
}
