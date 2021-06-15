import {Command} from "discord-akairo";
import {Message, TextChannel} from "discord.js";

export default class Clear extends Command {
    public constructor() {
        super("clear", {
            aliases: ["clear"],
            channel: "guild",
            category: "Public Commands",
            userPermissions: "MANAGE_MESSAGES",
            clientPermissions: ["MANAGE_MESSAGES"],
            description: {
                content: "Clears the amount of messages specified",
                usage: "clear [amount]",
                examples: [
                    "clear",
                    "clear [amount]",
                ]
            },
            args: [{
                id: "amount",
                type: "integer",
                default: 1,
            },
            ]
        });
    }

    public async exec(message: Message, {amount}: { amount: number }): Promise<void | Message> {
        if (message.channel instanceof TextChannel) {
            if (amount <= 0 || amount > 99) {
                return message.util!.send("I can't clear that amount")
            } else amount++;
            console.log(amount)
            await message.channel.bulkDelete(amount, true).catch(reason => console.log(reason));
            return;
        } else {
            return message.util!.send("You can't clear messages not in a TextChannel");
        }

    }
}