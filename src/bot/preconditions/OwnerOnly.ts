import { Precondition, PreconditionResult } from "@sapphire/framework";
import { Message } from "discord.js";

export class OwnerOnly extends Precondition {
  public run(message: Message): PreconditionResult {
    return process.env.OWNER === message.author.id ? this.ok() : this.error({message: "This message can only be used by my owner."});
  }
}