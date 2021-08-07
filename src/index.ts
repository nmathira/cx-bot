import "module-alias/register";
import type { BitFieldResolvable, IntentsString } from "discord.js";
import dotEnvExtended from "dotenv-extended";
import CxClient from "@lib/extensions/CxClient";

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
  .then(() => cxbot.logger.info("we logged in baby"))
  .catch(() => {
    cxbot.logger.fatal("oh no, bot doesn't have life support");
    cxbot.destroy();
    process.exit(1);
  });