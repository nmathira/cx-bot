import type { Args } from "@sapphire/framework";
import type { CxCommandOptions } from "@typings/index";
import CxCommand from "@lib/extensions/CxCommand";
import type { Message } from "discord.js";
import { ApplyOptions } from "@sapphire/decorators";
import { fetch, FetchResultTypes } from "@sapphire/fetch";
import CxEmbed from "@lib/extensions/CxEmbed";
import { send } from "@sapphire/plugin-editable-commands";

@ApplyOptions<CxCommandOptions>({
  aliases: ["leo"],
  description: "defines words for you.",
  detailedDescription:
    "defines inputted words using the Merriam Webster Dictionary",
  examples: ["cx define banana"],
  usage: "cx define [word]",
})
export default class Define extends CxCommand {
  public async messageRun(message: Message, args: Args): Promise<Message> {
    const word = await args
      .pick("string")
      .catch(message =>
        message.channel.send(
          "Please pass in a word that you would like to define",
        ),
      );
    const dictionary = await fetch<never>(
      `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.DICTIONARY_TOKEN}`,
      FetchResultTypes.JSON,
    );
    if (dictionary === [] || dictionary[0]["shortdef"] === undefined)
      return message.channel.send("that word doesn't seem to exist");
    return send(message, {
      embeds: [
        new CxEmbed()
          .setTitle("Definition for: " + word)
          .setDescription(dictionary[0]["shortdef"][0]),
      ],
    });
  }
}
