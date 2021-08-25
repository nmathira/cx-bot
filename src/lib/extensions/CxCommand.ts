import type { PieceContext } from "@sapphire/framework";
import { Command } from "@sapphire/framework";
import type { CxCommandOptions } from "@typings/index";

export default abstract class CxCommand extends Command {
  public examples: Readonly<string[]>;
  public usage: Readonly<string>;

  protected constructor(context: PieceContext, options: CxCommandOptions) {
    super(context, options);
    this.category = options.category ?? "";
    this.examples = options.examples ?? [""];
    this.usage = options.usage ?? "";
  }

  private _category: Readonly<string>;

  public get category(): Readonly<string> {
    return this._category;
  }

  public set category(value: Readonly<string>) {
    this._category = value;
  }

  // eslint-disable-next-line
  public toJSON(): Record<string, any> {
    return {
      ...super.toJSON(),
      content: this.category,
      examples: this.examples,
      usage: this.usage,
    };
  }
}