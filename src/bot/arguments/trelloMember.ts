// import type { AsyncArgumentResult } from "@sapphire/framework";
// import { Argument } from "@sapphire/framework";
// import { getMembersFromBoard } from "@lib/trello/trello";
// import type { boardMember } from "@typings/index";
//
// export default class extends Argument<boardMember> {
//   public async run(parameter: string): AsyncArgumentResult<boardMember> {
//     const members = await getMembersFromBoard();
//     for (const member of members) {
//       if (member.username === parameter) return this.ok(member);
//     }
//     return this.error({ parameter, identifier: "boardMember" });
//   }
// }
