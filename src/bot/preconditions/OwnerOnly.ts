import type { PreconditionResult } from "@sapphire/framework";
import { Precondition } from "@sapphire/framework";
import type { Message } from "discord.js";

export class OwnerOnly extends Precondition {
  public run(message: Message): PreconditionResult {
    return process.env.OWNER === message.author.id
      ? this.ok()
      : this.error({ message: "This message can only be used by my owner." });
  }
}
declare module "@sapphire/framework" {
  interface Preconditions {
    OwnerOnly: never;
  }
}
