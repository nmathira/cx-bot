import type { ArgumentResult, Piece } from "@sapphire/framework";
import { Argument } from "@sapphire/framework";

export default class extends Argument<Piece> {
  public run(parameter: string): ArgumentResult<Piece> {
    for (const store of this.container.stores.values()) {
      if (store.has(parameter)) return this.ok(store.get(parameter));
    }
    return this.error({ identifier: "piece", parameter });
  }
}
