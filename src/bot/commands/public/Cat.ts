const fetcher = require("node-fetch");
import {Message} from "discord.js";
import {Command} from "discord-akairo";
import {hypixelapi} from "../../../config/config"

export default class Cat extends Command {
  public constructor() {
    super("cat", {
      aliases: ["cat"],
      category: "Public Commands",
      description: {
        content: "gets pictures of cats",
        usage: "cat",
        examples: ["cat"],
      },
    });
  }

  public async exec(message: Message): Promise<Message> {
    fetcher("https://api.hypixel.net/key", {
      method: "post",
      headers: {
        "API-Key": hypixelapi,
      },
    }).then((res: { json: () => any; }) => res.json())
    return message.util!.send("you succeeded");

  }
}
