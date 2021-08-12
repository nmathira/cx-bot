import type { ArgumentResult, StoreRegistryEntries } from "@sapphire/framework";
import { Argument } from "@sapphire/framework";

export default class extends Argument<StoreRegistryEntries> {
  public run(parameter: string): ArgumentResult<StoreRegistryEntries> {
    return this.container.stores.has(parameter)
      ? this.ok(this.container.stores.get(parameter))
      : this.error({ parameter, identifier: "Store" });
  }
}

declare module "@sapphire/framework/" {
  export interface ArgType {
    store: StoreRegistryEntries;
  }
}