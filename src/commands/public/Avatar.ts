import {Command} from "discord-akairo";
import {GuildMember, ImageSize, Message, MessageEmbed} from "discord.js";

export default class Avatar extends Command {
    public constructor() {
        super("avatar", {
            aliases: ["avatar", "av"],
            category: "Public Commands",
            description: {
                content: "Displays the avatar of the member",
                usage: "avatar [ member ]",
                examples: [
                    "avatar",
                    "avatar @user#0001",
                    "avatar user",
                ]
            },
            ratelimit: 3,
            args: [
                {
                    id: "member",
                    type: "member",
                    match: "rest",
                    default: (msg: Message) => msg.member
                },
                {
                    id: "size",
                    type: (_: Message, str: string): null | number => {
                        return str && !isNaN(Number(str)) && [16, 32, 64, 128, 256, 512, 1024, 2048].includes(Number(str)) ? Number(str) : null;
                    },
                    match: "option",
                    flag: ["--size "],
                    default: 2048,
                }
            ]
        });
    }

    public async exec(message: Message, {member, size}: { member: GuildMember, size: number }): Promise<Message> {
        return message.util.send(new MessageEmbed()
            .setTitle("avatar")
            .setColor("RANDOM")
            .setImage(member.user.displayAvatarURL({size: size as ImageSize}))
        );
    }
}