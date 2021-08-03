import type { CommandOptions, PieceContext } from "@sapphire/framework";
import { Command } from "@sapphire/framework";

export interface CxCommandOptions extends CommandOptions {
  category?: string;
  examples?: string[];
  usage?: string;
}

export abstract class CxCommand extends Command {
  public category: Readonly<string>;
  public examples: Readonly<string[]>;
  public usage: Readonly<string>;

  protected constructor(context: PieceContext, options: CxCommandOptions) {
    super(context, options);
    this.category = options.category ?? "";
    this.examples = options.examples ?? [""];
    this.usage = options.usage ?? "";
  }

  public toJSON(): Record<string, any> {
    return {
      ...super.toJSON(),
      content: this.category,
      examples: this.examples,
      usage: this.usage,
    };
  }
}
