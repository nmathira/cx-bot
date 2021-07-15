import {Command} from "discord-akairo";
import {GuildMember, Message, MessageEmbed} from "discord.js";

export default class User extends Command {
  public constructor() {
    super("userinfo", {
      aliases: ["userinfo", "ui"],
      category: "Public Commands",
      // description: {
      //   content: "Displays User Info about the member",
      //   usage: "userinfo [ member ]",
      //   examples: [
      //     "userinfo",
      //     "userinfo @user#0001",
      //     "userinfo user",
      //   ],
      // },
      ratelimit: 3,
      args: [
        {
          id: "member",
          type: "member",
          match: "rest",
          default: (msg: Message) => msg.member,
        },
      ],
    });
  }

  public async exec(message: Message, {member}: { member: GuildMember }): Promise<Message> {
    let embed = new MessageEmbed()
      .setAuthor(member.user.username, member.user.avatarURL()!)
      .setTitle(member.user.tag)
      .setColor(member.displayColor)
      .setThumbnail(member.user.avatarURL()!)
      .addField("mention", member.user.toString(), true)
      .addField("creation time", `${member.user.createdAt.toUTCString()}`)
      .addField("joined at", member.joinedAt!.toUTCString(), true)
      .setFooter(member.user.id, member.user.avatarURL()!)
      .setTimestamp(new Date());
    return await message.util!.send({embeds: [embed]});
  }
}
