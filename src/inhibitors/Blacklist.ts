import {Command, Inhibitor} from "discord-akairo";
import {Message} from "discord.js";

export default class BlacklistInhibitor extends Inhibitor {
    constructor() {
        super('blacklist', {
            reason: 'blacklist'
        })
    }

    public exec(message: Message, command?: Command): boolean | Promise<boolean> {
        const blacklist = [];
        return blacklist.includes(message.author.id);
    }


}
