import type { PieceContext } from "@sapphire/framework";
import { Listener } from "@sapphire/framework";

export default class Debug extends Listener {
  public constructor(context: PieceContext) {
    super(context);
  }

  public run(debug: string): void {
    this.container.logger.debug("[CxBot] " + debug);
  }
}
