import type { PieceContext } from "@sapphire/framework";
import { Listener } from "@sapphire/framework";

export class ready extends Listener {
  public constructor(context: PieceContext) {
    super(context, { once: true });
  }

  public run(): void {
    this.container.logger.info("Successfully logged in!");
  }
}
