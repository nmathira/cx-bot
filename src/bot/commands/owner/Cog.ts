import {Command} from "discord-akairo";
import {Message} from "discord.js";

export default class Ping extends Command {
    public constructor() {
        super("cog", {
            aliases: ["cog", "coggers"],
            category: "Owner",
            ownerOnly: true,
            args: [{
                id: "action",
                type: "string",
            },
                {
                    id: "command",
                    type: "command"

                }],
            ratelimit: 3,
        });
    }

    public async exec(message: Message, args: any): Promise<Command | undefined> {
        if (args.action === "reload") return this.client.commandHandler.reload(args.command);
        else if (args.action === "unload") return this.client.commandHandler.remove(args.command);
        else await message.util!.send("that command doesn't exist or isn't loaded");
    }
}