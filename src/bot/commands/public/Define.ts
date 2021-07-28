import { Command } from "discord-akairo";
import { Message } from "discord.js";
import fetch from "node-fetch";
import { dictionary } from "@config/config";

export default class Define extends Command {
  public constructor() {
    super("define", {
      aliases: ["define", "definition", "leo"],
      category: "Public Commands",
      description: "defines words! Or breaks, depending on cxbot's mood",
      args: [{
        id: "word",
        type: "string",
        prompt: true,
      },
      ],
    });
  }

  public async exec(message: Message, {word}: { word: string }): Promise<Message> {
    if (word === null || word === undefined) return message.util!.send("You didn't pass in an argument!")
    let webster = await fetch(`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${dictionary}`).then((response: { json: () => any; }) => response.json());
    if (!("0" in webster && "shortdef" in webster[0] && "0" in webster["0"]["shortdef"]))
      return message.util!.send("That word probably doesn't exist")
    return await message.util!.send(webster[0]["shortdef"][0]);
  }
}
