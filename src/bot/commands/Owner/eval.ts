import { Message } from "discord.js";
import { ApplyOptions } from "@sapphire/decorators";
import { CxCommand, CxCommandOptions } from "@lib/command/CxCommand";
import { Args } from "@sapphire/framework";
import { codeBlock, isThenable } from "@sapphire/utilities";
import { inspect } from "util";
import { Type } from "@sapphire/type";

@ApplyOptions<CxCommandOptions>({
  name: "eval",
  aliases: ["eval"],
  category: "Owner",
  usage: "cx eval",
  preconditions: ["OwnerOnly"],
  examples: ["cx eval"],
  description: "Evaluates arbitrary javascript",
  detailedDescription: "Uses the eval() function to evaluate javascript in CxBot.",
})
export class Eval extends CxCommand {

  public async run(message: Message, args: Args): Promise<Message> {
    const code = await args.rest("string");

    const {result, success, type} = await this.eval(message, code, {
      async: args.getFlags("async"),
      depth: Number(args.getOption("depth")) ?? 0,
      showHidden: args.getFlags("hidden", "showHidden"),
    });

    const output = success ? codeBlock("js", result) : `**ERROR**: ${codeBlock("bash", result)}`;
    if (args.getFlags("silent", "s")) return null;

    const typeFooter = `**Type**: ${codeBlock("typescript", type)}`;

    return message.channel.send(`${output}\n${typeFooter}`);
  }

  private async eval(message: Message, code: string, flags: { async: boolean; depth: number; showHidden: boolean }) {
    if (flags.async) code = `(async () => {\n${code}\n})();`;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const msg = message;

    let success = true;
    let result: string;

    try {
      // eslint-disable-next-line no-eval
      result = eval(code);
    } catch (error) {
      if (error && error.stack) {
        this.container.client.logger.error(error);
      }
      result = error;
      success = false;
    }

    const type = new Type(result).toString();
    if (isThenable(result)) result = await result;

    if (typeof result !== "string") {
      result = inspect(result, {
        depth: flags.depth,
        showHidden: flags.showHidden,
      });
    }

    return {result, success, type};
  }

}