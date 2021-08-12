import type { Message } from "discord.js";
import { ApplyOptions } from "@sapphire/decorators";
import type { CxCommandOptions } from "@typings/index";
import CxCommand from "@lib/extensions/CxCommand";
import type { Args } from "@sapphire/framework";

@ApplyOptions<CxCommandOptions>({
  category: "Owner",
  description: "reloads the command specified",
  detailedDescription:
    "Sends the ping of CxBot's connection to Discord, as well as the ping from Discord.",
  examples: ["cx reload", "cx reload [command]"],
  preconditions: ["OwnerOnly"],
  usage: "cx reload {command}",
})
export class Reload extends CxCommand {
  async run(message: Message, args: Args): Promise<Message> {
    if (args.finished) {
      for (const store of this.container.stores.values()) {
        store.forEach((piece) => {
          piece.reload();
          this.container.logger.info(piece.name);
        });
      }
      return message.channel.send("All Pieces reloaded!");
    } else {
      return message.channel.send(
        "Reloaded piece: " +
          (await args.pick("Piece").then((piece) => piece.reload()))
      );
    }
  }
}