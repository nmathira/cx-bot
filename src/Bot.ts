import {owners, token} from "./config";
import BotClient from "./client/BotClient";

const client: BotClient = new BotClient({token, owners});
client.start();