import type { CommandOptions } from "@sapphire/framework";
import type {
  Guild,
  GuildChannel,
  GuildMember,
  Message,
  TextBasedChannelTypes,
} from "discord.js";
import type { Readable } from "stream";

export interface safeExecResult {
  stdout: string | Readable;
  stderr: string | Readable;
  exitCode: number;
  err: Error;
}

export interface CxCommandOptions extends CommandOptions {
  category?: string;
  examples?: string[];
  usage?: string;
}

export interface GuildMessage extends Message {
  channel: Extract<TextBasedChannelTypes, GuildChannel>;
  readonly guild: Guild;
  readonly member: GuildMember;
}
