import { CxCommand } from "@lib/command/CxCommand";
import type { Message } from "discord.js";
import { MessageEmbed } from "discord.js";
import type { Args } from "@sapphire/framework";
import { fetch, FetchResultTypes } from "@sapphire/fetch";

export class Define extends CxCommand {
  public async run(message: Message, args: Args): Promise<Message> {
    const word = await args
      .pick("string")
      .catch((message) =>
        message.channel.send(
          "Please pass in a word that you would like to define"
        )
      );
    const dictionary = await fetch<any>(
      `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.DICTIONARY_TOKEN}`,
      FetchResultTypes.JSON
    );
    if (dictionary === [] || dictionary[0]["shortdef"] === undefined)
      return message.channel.send("that word doesn't seem to exist");
    return message.channel.send({
      embeds: [
        new MessageEmbed()
          .setTitle("Definition for: " + word)
          .setDescription(dictionary[0]["shortdef"][0]),
      ],
    });
  }
}