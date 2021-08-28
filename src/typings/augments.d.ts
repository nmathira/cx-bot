import type { Piece, StoreRegistryEntries } from "@sapphire/framework";
import type { PrismaClient } from "@prisma/client";
import type { TaskStore } from "@lib/Task/TaskStore";
import type CxClient from "@lib/extensions/CxClient";

declare module "@sapphire/framework/" {
  interface ArgType {
    Piece: Piece;
    Store: StoreRegistryEntries;
    trelloMember: trelloMember;
  }

  interface Preconditions {
    OwnerOnly: never;
  }

  interface Command {
    category: Readonly<string>;
    examples: Readonly<string[]>;
    usage: Readonly<string>;
  }
}

declare module "@sapphire/pieces" {
  interface StoreRegistryEntries {
    tasks: TaskStore;
  }

  interface Container {
    database: PrismaClient;
    client: CxClient;
  }
}
