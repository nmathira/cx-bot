import {owners, token} from "./config";
import BotClient from "./client/BotClient";

const client: BotClient = new BotClient({token, owners});
client.start().then(r => {
    console.log("bot has started up")
});