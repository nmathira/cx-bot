import {owners, token} from "./config/config";
import Client from "./bot/client/Client";

const client: Client = new Client({token, owners});
client.start().then();