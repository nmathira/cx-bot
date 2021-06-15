import {BaseClient} from "discord.js";

const cron = require('node-cron');
export default async function trelloReminders(client: BaseClient) {
    return cron.schedule("* * * * * *", () => {
        // @ts-ignore
        client.channels.fetch("848382911311773716").then((cnl) => cnl.send("yea"));
    })
}
