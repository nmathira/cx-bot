import type { BitFieldResolvable, IntentsString } from "discord.js";
import type { SapphirePrefix } from "@sapphire/framework";
import { SapphireClient } from "@sapphire/framework";
import { TaskStore } from "@lib/Task/TaskStore";
import { join } from "path";

export default class CxClient extends SapphireClient {
  public constructor({
    prefix = process.env.PREFIX,
    intents = [
      "DIRECT_MESSAGES",
      "GUILDS",
      "GUILD_MEMBERS",
      "GUILD_BANS",
      "GUILD_INVITES",
      "GUILD_MESSAGES",
      "GUILD_MESSAGE_REACTIONS",
    ],
  }: {
    prefix: SapphirePrefix;
    intents: BitFieldResolvable<IntentsString, number>;
  }) {
    super({
      baseUserDirectory: join(__dirname, "..", "..", "bot"),
      caseInsensitiveCommands: true,
      caseInsensitivePrefixes: true,
      defaultPrefix: prefix,
      intents: intents,
    });
    // Store.defaultStrategy.onLoad = (store, piece) => container.logger.info(`Loading ${store.name}:${piece.name}`);
    this.stores.register(new TaskStore());
  }

  public fetchPrefix = (): string => process.env.PREFIX;
}
declare module "@sapphire/pieces" {
  interface StoreRegistryEntries {
    tasks: TaskStore;
  }
}

declare module "@sapphire/framework" {
  interface Command {
    category: Readonly<string>;
    examples: Readonly<string[]>;
    usage: Readonly<string>;
  }
}
