import { PrismaClient } from "@prisma/client";
import { container, LogLevel, SapphireClient } from "@sapphire/framework";
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
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
        "GUILDS",
        "GUILD_BANS",
        "GUILD_EMOJIS_AND_STICKERS",
        "GUILD_MEMBERS",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_VOICE_STATES",
      ],
      logger: { level: LogLevel.Debug },
    });
    // Store.defaultStrategy.onLoad = (store, piece: Piece) => container.logger.debug(`Loading ${store.name}:${piece.name}`);
    this.stores.register(new TaskStore());
    container.database = new PrismaClient();
    container.client = this;
  }

  public fetchPrefix = (): string => process.env.PREFIX;

  public start(): void {
    this.login(process.env.DISCORD_TOKEN).catch(() => this.stop());
  }

  public stop(): void {
    process.exit(1);
  }
}