import type { PieceContext } from "@sapphire/framework";
import { Listener } from "@sapphire/framework";

export class Warn extends Listener {
  public constructor(context: PieceContext) {
    super(context);
  }

  public run(info: string): void {
    this.container.logger.warn("[CxBot] " + info);
  }
}