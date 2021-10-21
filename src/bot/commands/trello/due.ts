// import type { CxCommandOptions } from "@typings/index";
// import CxCommand from "@lib/extensions/CxCommand";
// import {
//   getCardsForMember,
//   getTrelloIdFromDiscordId,
// } from "@lib/trello/trello";
//
// @ApplyOptions<CxCommandOptions>({
//   description: "Shows all unfinished tasks you have left on trello",
//   detailedDescription: "Shows all unfinished tasks you have left on trello",
//   examples: ["cx register [trellousername]"],
//   usage: "cx register [trellousername]",
// })
// export default class Due extends CxCommand {
//   async messageRun(message: Message): Promise<Message> {
//     const trellouser = await getTrelloIdFromDiscordId(
//       message.author.id,
//       this.container.database,
//     );
//     const cards = await getCardsForMember(trellouser);
//     const embed = new CxEmbed().setTitle("Your unfinished tasks!");
//     cards.forEach(element => {
//       console.dir(element);
//       if (element.due) {
//         embed.addField(element.name, new Date(element.due).toDateString());
//       } else embed.addField(element.name, "No Date Specified.");
//     });
//     return message.channel.send({ embeds: [embed] });
//   }
// }
