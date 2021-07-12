import "module-alias/register";
import {
  AkairoClient,
  CommandHandler,
  InhibitorHandler,
  ListenerHandler,
} from "discord-akairo";
import {join} from "path";
import {owners, prefix} from "@config/config";

declare module "discord-akairo" {

  interface AkairoClient {
    commandHandler: CommandHandler;
    listenerHandler: ListenerHandler;
  }
}

interface BotOptions {
  token: string;
  owners: string;
}

export default class CxClient extends AkairoClient {
  public config: BotOptions;
  public listenerHandler: ListenerHandler = new ListenerHandler(this, {
    directory: join(__dirname, "..", "listeners"),
  })
  public commandHandler: CommandHandler = new CommandHandler(this, {
    directory: join(__dirname, "..", "commands"),
    prefix: prefix,
    allowMention: true,
    handleEdits: true,
    commandUtil: true,
    commandUtilLifetime: 3e5,
    defaultCooldown: 3e5,
    // argumentDefaults: {
    //     prompt: {
    //         modifyStart: (_, str): string => `${str}\n\nType \`cancel\` to cancel the command`,
    //         modifyRetry: (_, str): string => `${str}\n\nType \`cancel\` to cancel the command`,
    //         timeout: "You took too long, and the command has been cancelled",
    //         ended: "You exceeded the maximum amount of tries, so the command has been cancelled",
    //         cancel: "This command has been cancelled",
    //         retries: 3,
    //         time: 1e4,
    //     },
    //     otherwise: "",
    // },
    ignorePermissions: owners,
    ignoreCooldown: owners,
  });
  public inhibitorHandler = new InhibitorHandler(this, {
    directory: join(__dirname, "..", "inhibitors"),
  })
  public scheduledHandler = new ScheduleHandler(this, {
    directory: join(__dirname, "..", "scheduled"),
  })

  public constructor(config: BotOptions) {
    super({ownerID: config.owners}, {
      ws: {
        intents: [
          "DIRECT_MESSAGES",
          "GUILDS",
          "GUILD_MEMBERS",
          "GUILD_BANS",
          "GUILD_INVITES",
          "GUILD_MESSAGES",
          "GUILD_MESSAGE_REACTIONS",
        ],
      },
    });
    this.config = config;
  }

  public async start(): Promise<string> {
    await this._init();
    return this.login(this.config.token);
  }

  private async _init(): Promise<void> {
    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      inhibitorHandler: this.inhibitorHandler,
      listenerHandler: this.listenerHandler,
      process,
    });

    this.commandHandler.loadAll();
    this.listenerHandler.loadAll();
    this.scheduledHandler.loadAll();
    this.inhibitorHandler.loadAll();
  }
}
