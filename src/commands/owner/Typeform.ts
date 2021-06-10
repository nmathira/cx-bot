import {Message} from "discord.js";
import {Command} from "discord-akairo";
import {typeformtoken} from "../../config";
import {typeformurl} from "../../config";


export default class Typeform extends Command {
    public constructor() {
        super('typeform', {
            aliases: ["typeform"]
        });
    }
    public exec(message: Message): Promise<Message> {
        fetch()
        return message.util.send("hellow");
    }
}
