import { BitFieldResolvable, IntentsString } from "discord.js";
import { SapphireClient, SapphirePrefix } from "@sapphire/framework";
import { join } from "path";

export default class CxClient extends SapphireClient {
  public constructor({
    prefix = process.env.PREFIX,
    intents = ["DIRECT_MESSAGES", "GUILDS", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_INVITES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"],
  }: { prefix: SapphirePrefix, intents: BitFieldResolvable<IntentsString, number> }) {
    super({
      caseInsensitiveCommands: true,
      baseUserDirectory: join(__dirname, "..", "..", "bot"),
      caseInsensitivePrefixes: true,
      intents: intents,
      defaultPrefix: prefix,
    });
  }

  public fetchPrefix = (): string => process.env.PREFIX;
}