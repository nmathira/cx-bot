import { Command } from "discord-akairo";
import { Message } from "discord.js";
import fetch from "node-fetch";
import { dictionary } from "../../../config/config";

export default class Define extends Command {
    public constructor() {
        super("define", {
            aliases: ["define", "definition", "leo"],
            category: "Public Commands",
            description: {
                content: "Use a dictionary to define words!",
                usage: "define [ word ]",
                examples: [
                    "define word"
                ]
            },
            args: [{
                id: "word",
                type: "string",
                prompt: true,
            },
            ]
        });
    }

    public async exec(message: Message, { word }: { word: string }): Promise<Message> {
        if (word === null || word === undefined) return message.util!.send("You didn't pass in an argument!")
        let webster = await fetch(`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${dictionary}`);
        let final: Array<object> = await webster.json();
        if (!("0" in final && "shortdef" in final[0] && "0" in final["0"]["shortdef"]))
            return message.util!.send("That word probably doesn't exist")
        return message.util!.send(final[0]["shortdef"][0]);
    }
}