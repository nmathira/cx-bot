// import type { Message } from "discord.js";
// import { ApplyOptions } from "@sapphire/decorators";
// import type { CxCommandOptions } from "@typings/index";
// import CxCommand from "@lib/extensions/CxCommand";
// import type { Args } from "@sapphire/framework";
//
// @ApplyOptions<CxCommandOptions>({
//   description: "registers your trello username",
//   detailedDescription:
//     "registers your trello username into CxBot for Trello Integration",
//   examples: ["cx register [trellousername]"],
//   usage: "cx register [trellousername]",
// })
// export default class Register extends CxCommand {
//   async messageRun(message: Message, args: Args): Promise<Message> {
//     const arg = await args.pickResult("trelloMember");
//     if (!arg.success)
//       return message.channel.send(
//         "that wasn't a valid member in the Explore Hack's Trello Board!",
//       );
//     await this.container.database.trelloUser
//       .create({
//         data: {
//           discordId: message.author.id,
//           trelloId: arg.value.id,
//         },
//       })
//       .catch(() => {
//         message.channel.send(
//           "You are already registered for CxBot's Trello Integration!",
//         );
//       });
//     return message.channel.send(
//       "success! You have been registered into CxBot's Register Integration",
//     );
//   }
// }
