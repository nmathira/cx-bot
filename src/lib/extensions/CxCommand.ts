import type { PieceContext } from "@sapphire/framework";
import { Command } from "@sapphire/framework";
import type { CxCommandJSON, CxCommandOptions } from "@typings/index";

export default abstract class CxCommand extends Command {
  public examples: Readonly<string[]>;
  public usage: Readonly<string>;

  protected constructor(context: PieceContext, options: CxCommandOptions) {
    super(context, options);
    this.examples = options.examples ?? [""];
    this.usage = options.usage ?? "";
  }

  // eslint-disable-next-line
  public toJSON(): CxCommandJSON {
    return {
      ...super.toJSON(),
      examples: this.examples,
      usage: this.usage,
    };
  }
}
