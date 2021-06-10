import {Command} from "discord-akairo";
import {GuildMember, Message, MessageEmbed} from "discord.js";

export default class User extends Command {
    public constructor() {
        super("userinfo", {
            aliases: ["userinfo", "ui"],
            category: "Public Commands",
            description: {
                content: "Displays User Info about the member",
                usage: "userinfo [ member ]",
                examples: [
                    "userinfo",
                    "userinfo @user#0001",
                    "userinfo user",
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
            ]
        });
    }

    public async exec(message: Message, {member}: { member: GuildMember }): Promise<Message> {
        return message.util.send(new MessageEmbed()
            .setAuthor(member.user.username, member.user.avatarURL())
            .setTitle(member.user.tag)
            .setColor(member.displayColor)
            .setThumbnail(member.user.avatarURL())
            .addFields({
                name: "presence",
                value: member.user.presence.clientStatus?.web ?? member.user.presence.clientStatus?.mobile ?? member.user.presence.clientStatus?.desktop ?? "offline",
                inline: true
            })
            .addFields({name: "mention", value: member.user, inline: true})
            .addFields({name: "creation time", value: `${member.user.createdAt.toUTCString()}`,})
            .addFields({name: "joined at", value: member.joinedAt.toUTCString(), inline: true})

            // .addFields({name: "permissions", value: member.permissions.toArray()})
            .setFooter(member.user.id, member.user.avatarURL())
            .setTimestamp(new Date())
        );
    }
}