# CxBot

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/ae9fadb699b24688a4cdfaa2c2c4804f)](https://app.codacy.com/gh/Neragin/cx-bot?utm_source=github.com&utm_medium=referral&utm_content=Neragin/cx-bot&utm_campaign=Badge_Grade_Settings)

## A Discord Bot based on Discord.js and the Sapphire Framework.

CxBot is a Discord bot that allows me to automate and improve many aspects of
Discord.

### to run:

1. Install dependencies with `npm i`
2. Fill out a new file called .env with the template in .env.schema
3. run `tsc` and compile the project
4. If the compilation succeeded, proceed to run the bot by doing `node dist &`
5. If you want to work with trello integration, you will need a postgres
   database. Use prisma to generate the tables and such. To do that,
   1. set the databse url in the `.env` file. It should look something
      like: `DATABASE_URL="postgres://{user}:{password}@{location[localhost]}:{port}/{dbname}&schema={schema type [probably public]}"`
   2. After, run `npx prisma migrate dev --name init`
   3. Now, to get the client run `npm install @prisma/client`
   4. If you plan on changing the database, you will need to migrate the
      structure with `npm install @prisma/client`

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
