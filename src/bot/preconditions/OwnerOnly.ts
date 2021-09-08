import type { PreconditionResult } from "@sapphire/framework";
import { Precondition } from "@sapphire/framework";
import type { Message } from "discord.js";

export default class OwnerOnly extends Precondition {
  public run(message: Message): PreconditionResult {
    return process.env.OWNER === message.author.id
      ? this.ok()
      : this.error({
          message: "This message can only be used by the owner of me.",
        });
  }
}
