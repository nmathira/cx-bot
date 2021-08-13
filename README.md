# CxBot

## A Discord Bot based on Discord.js and the Sapphire Framework.

CxBot is a Discord bot that allows me to automate and improve many aspects of
Discord.

### to run:

1. Fill out .env with the template in .env.schema
2. run `tsc` and compile the project
3. If the compilation succeded, proceed to run the bot by doing `node dist &`

### Architecture:

```text
./src/                  Root directory.
  |-bot/                Sapphire specific directory.
  | |-arguments/        Custom arguments for commands.
  | |-commands/         Commands.
  | |-listeners/        Event listeners.
  | |-preconditions/    Preconditions for commands.
  | |-tasks/            Tasks running on cron intrevals.
  |-lib/                Util and backend logic.
  | |-extensions/       Classes that extend library classes.
  | |-Task/             Task's piece and store.
  | |-utils/            General utility functions.
  |-prisma/             Prisma & database specific files.
  |-typings/            Custom typescript types.
```
