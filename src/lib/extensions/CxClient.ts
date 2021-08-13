import { SapphireClient } from "@sapphire/framework";
import { TaskStore } from "@lib/Task/TaskStore";
import { join } from "path";

export default class CxClient extends SapphireClient {
  public constructor() {
    super({
      baseUserDirectory: join(__dirname, "..", "..", "bot"),
      caseInsensitiveCommands: true,
      caseInsensitivePrefixes: true,
      defaultPrefix: process.env.PREFIX,
      intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_BANS",
        "GUILD_EMOJIS_AND_STICKERS",
        "GUILD_VOICE_STATES",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
      ],
    });
    // Store.defaultStrategy.onLoad = (store, piece) => container.logger.info(`Loading ${store.name}:${piece.name}`);
    this.stores.register(new TaskStore());
  }

  public fetchPrefix = (): string => process.env.PREFIX;

  // public start(): SapphireClient {
  public start(): void {
    this.login(process.env.DISCORD_TOKEN)
      .then(() => this.logger.info("Logged in as " + this.user.username))
      .catch(() => {
        this.logger.fatal("bot has fucking died");
        this.destroy();
        process.exit(1);
      });
    // return this;
  }
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