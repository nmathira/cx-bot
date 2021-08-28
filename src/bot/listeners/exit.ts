import type { PieceContext } from "@sapphire/framework";
import { container, Listener } from "@sapphire/framework";

export default class Exit extends Listener {
  public constructor(context: PieceContext) {
    super(context, { emitter: process });
  }

  public run(): void {
    this.container.logger.fatal(
      "[CxBot] CxBot has been told to shutdown, so it will."
    );
    this.container.client.destroy();
    container.database.$disconnect();
  }
}