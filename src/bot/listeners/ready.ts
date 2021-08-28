import type { PieceContext } from "@sapphire/framework";
import { Listener } from "@sapphire/framework";

export default class Ready extends Listener {
  public constructor(context: PieceContext) {
    super(context, { once: true });
  }

  public run(): void {
    this.container.logger.info(
      "[CxBot] Successfully logged in as " + this.container.client.user.tag
    );
    this.container.client.user.setPresence({ status: "online" });
  }
}
