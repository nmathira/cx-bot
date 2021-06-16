import { owners, token } from "./config/config";
import Client from "./bot/client/Client";
import trelloReminders from "./bot/scheduled/cron";

const client: Client = new Client({ token, owners });
client.start().then(() => console.log("Now Online"));
// trelloReminders(client);
client.commandHandler.remove("trelloReminders");
