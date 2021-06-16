import { Command, Inhibitor } from "discord-akairo";
import { Message } from "discord.js";

export default class BlacklistInhibitor extends Inhibitor {
    constructor() {
        super('blacklist', {
            reason: 'blacklist'
        })
    }

    public async exec(message: Message, command?: Command): Promise<boolean> {
        return false;
        // const blacklist: string[] = [];
        // return blacklist.includes(message.author.id);
    }
}
