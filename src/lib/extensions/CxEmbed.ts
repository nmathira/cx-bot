import type { MessageEmbedOptions } from "discord.js";
import { MessageEmbed } from "discord.js";

export default class CxEmbed extends MessageEmbed {
  public constructor(data?: MessageEmbed | MessageEmbedOptions) {
    super(data);
    this.color = 1854189; // value obtainable by using parseInt("hex", 16);
    this.timestamp = Date.now();
  }
}
