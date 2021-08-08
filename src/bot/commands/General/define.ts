import type { Args } from "@sapphire/framework";
import type { CxCommandOptions } from "@typings/index";
import { CxCommand } from "@lib/extensions/CxCommand";
import type { Message } from "discord.js";
import { ApplyOptions } from "@sapphire/decorators";
import { fetch, FetchResultTypes } from "@sapphire/fetch";
import CxEmbed from "@lib/extensions/CxEmbed";

@ApplyOptions<CxCommandOptions>({
  aliases: ["leo"],
  category: "Utilities",
  description: "defines words for you.",
  detailedDescription:
    "defines inputted words using the Merriam Webster Dictionary",
  examples: ["cx define banana"],
  usage: "cx define [word]",
})
export class Define extends CxCommand {
  public async run(message: Message, args: Args): Promise<Message> {
    const word = await args
      .pick("string")
      .catch((message) =>
        message.channel.send(
          "Please pass in a word that you would like to define"
        )
      );
    const dictionary = await fetch<never>(
      `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.DICTIONARY_TOKEN}`,
      FetchResultTypes.JSON
    );
    if (dictionary === [] || dictionary[0]["shortdef"] === undefined)
      return message.channel.send("that word doesn't seem to exist");
    return message.channel.send({
      embeds: [
        new CxEmbed()
          .setTitle("Definition for: " + word)
          .setDescription(dictionary[0]["shortdef"][0]),
      ],
    });
  }
}