import type { Message } from "discord.js";
import { ApplyOptions } from "@sapphire/decorators";
import type { CxCommandOptions } from "@typings/index";
import CxCommand from "@lib/extensions/CxCommand";
import CxEmbed from "@lib/extensions/CxEmbed";
import { send } from "@sapphire/plugin-editable-commands";
import { getCat } from "@lib/utils/util";

@ApplyOptions<CxCommandOptions>({
  aliases: ["capyb"],
  description: "Gets information about a user.",
  detailedDescription:
    "Gets information about a user, if no arguments are passed in, it will default to the message author.",
  examples: ["cx userinfo", "cx userinfo [user]"],
  usage: "cx userinfo",
})
export default class Cat extends CxCommand {
  async messageRun(message: Message): Promise<Message> {
    console.log("command ran lmao");

    let cat = await getCat();
    return send(message, {
      embeds: [
        new CxEmbed()
          .setImage(
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.udacity.com%2Fblog%2Fwp-content%2Fuploads%2F2020%2F11%2FHello-World_Blog-scaled.jpeg&f=1&nofb=1",
          )
          // https://cdn2.thecatapi.com/images/dt5.jpg
          .setThumbnail(
            "https://api.thecatapi.com/v1/images/search?api_key=16ff346b-d8eb-47ff-8c46-97ff92f549be",
          )
          .setTitle("Cat!"),
      ],
    });
  }
}
