import { Command } from "discord-akairo";
import { GuildMember, ImageSize, Message, MessageEmbed } from "discord.js";

export default class Avatar extends Command {
  public constructor() {
    super("avatar", {
      aliases: ["avatar", "av"],
      category: "Public Commands",
      description: "Shows the avatar of the user specified, defaults to the author of the command.",
      ratelimit: 3,
      args: [{
        id: "member",
        type: "member",
        match: "rest",
        default: (msg: Message) => msg.member,
      },
        {
          id: "size",
          type: (_: Message, str: string): null | number => {
            return str && !isNaN(Number(str)) && [16, 32, 64, 128, 256, 512, 1024, 2048].includes(Number(str)) ? Number(str) : null;
          },
          match: "option",
          flag: ["--size "],
          default: 2048,
        },
      ],
    });
  }

  public async exec(message: Message, {
    member,
    size,
  }: { member: GuildMember, size: number }): Promise<Message> {
    let embed = new MessageEmbed()
      .setTitle("avatar")
      .setColor("RANDOM")
      .setImage(member.user.displayAvatarURL({size: size as ImageSize}));
    return await message.util!.send({embeds: [embed]});
  }
}
