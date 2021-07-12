import "module-alias/register";
import {owners, token} from "@config/config";
import CxClient from "./bot/client/CxClient";

const cxbot: CxClient = new CxClient({token, owners});
cxbot.start().then(() => console.log("Now Online"));
/*
cxbot.commandHandler.remove("trelloReminders");
client.commandHandler.remove("cat");
*/
