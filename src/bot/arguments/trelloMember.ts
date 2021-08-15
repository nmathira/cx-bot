import type { AsyncArgumentResult } from "@sapphire/framework";
import { Argument } from "@sapphire/framework";
import type { trelloMember } from "@typings/index";
import { getMembersFromBoard } from "@lib/trello/trello";

export default class extends Argument<trelloMember> {
  public async run(parameter: string): AsyncArgumentResult<trelloMember> {
    const members = await getMembersFromBoard();
    for (const member of members) {
      if (member.username === parameter) return this.ok(member);
    }
    return this.error({ parameter, identifier: "boardMember" });
  }
}

declare module "@sapphire/framework/" {
  export interface ArgType {
    trelloMember: trelloMember;
  }
}
