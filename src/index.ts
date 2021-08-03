import dotEnvExtended from "dotenv-extended";
import "module-alias/register";
import CxClient from "./lib/client/CxClient";
import { BitFieldResolvable, IntentsString } from "discord.js";

dotEnvExtended.load();
const cxbot: CxClient = new CxClient({
  prefix: process.env.PREFIX,
  intents: <BitFieldResolvable<IntentsString, number>>[
    "DIRECT_MESSAGES",
    "GUILDS",
    "GUILD_MEMBERS",
    "GUILD_BANS",
    "GUILD_INVITES",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
  ],
});
cxbot
  .login(process.env.DISCORD_TOKEN)
  .then(() => cxbot.logger.info("we logged in baby"));
