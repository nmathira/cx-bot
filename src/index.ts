import {owners, token} from "@cx/config/config";
import CxClient from "./bot/client/CxClient";

const cxbot: CxClient = new CxClient({token, owners});
cxbot.start().then(() => console.log("Now Online"));
/*
cxbot.commandHandler.remove("trelloReminders");
client.commandHandler.remove("cat");
*/
