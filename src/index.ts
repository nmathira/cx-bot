import "module-alias/register";
import dotEnvExtended from "dotenv-extended";
import CxClient from "@lib/extensions/CxClient";

dotEnvExtended.load();
new CxClient().start();
