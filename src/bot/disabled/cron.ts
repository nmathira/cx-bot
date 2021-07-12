import {MessageEmbed} from "discord.js";
import {
  convertTrelloMembers,
  getCardsFromBoard,
  getTODO,
} from "src/util/trello";
import CxClient from "../client/CxClient";

const cron = require("node-cron");
export default async function trelloReminders(client: CxClient) {
  let list = getTODO(await getCardsFromBoard());
  let embed = new MessageEmbed();
  let newlocal = await client.guilds.fetch("809513807759409262");
  for (const value of list) {
    if (value.idMembers !== null && value.idMembers.length !== 0) {
      embed.addField(`${value.name} is due by ${value.due}`,
        "This task is assigned to" + await convertTrelloMembers(value.idMembers, newlocal).then(result => result.toString()) ?? "No one")
      embed.addField("Finished this task?", `Mark it as completed here: ${value.url}`)
    } else {
      embed.addField(`${value.name} is due by: ${value.due}`, "This tasked is assigned to everyone or no one")
      embed.addField("Finished this task?", `Mark it as completed here: ${value.url}`)
    }
  }
  return cron.schedule("*/10 * * * * *", () => {
    // @ts-ignore
    client.channels.fetch("848382911311773716").then((cnl) => cnl.send(embed));
  })

}
