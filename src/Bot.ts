import {token, owners} from "./config";
import BotClient from "./client/BotClient";

const client: BotClient = new BotClient({token, owners});
client.start();