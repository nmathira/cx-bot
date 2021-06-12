import {Command} from "discord-akairo";
export default class Cog extends Command {
    public constructor() {
        super("cog", {
            aliases: ["cog"],
            category: "Owner",
            ownerOnly: true,
            args: [{
                id: "action",
                type: "string"
            }]
        });
    }
}