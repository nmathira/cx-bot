import "module-alias/register";
import dotEnvExtended from "dotenv-extended";
import CxClient from "@lib/extensions/CxClient";

process.env.NODE_ENV ??= "development";
dotEnvExtended.load()
new CxClient().start();
