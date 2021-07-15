import "module-alias/register";
import {owners, token} from "@config/config";
import CxClient from "./client/CxClient";

const cxbot: CxClient = new CxClient({token, owners});
cxbot.start().catch(console.error);
