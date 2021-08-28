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

export interface boardMember {
  id: string;
  username: string;
  fullName: string;
}

export interface Emoji {}

export interface DescData {
  emoji: Emoji;
}

export interface Trello {
  board: number;
  card: number;
}

export interface AttachmentsByType {
  trello: Trello;
}

export interface Badges {
  attachmentsByType: AttachmentsByType;
  location: boolean;
  votes: number;
  viewingMemberVoted: boolean;
  subscribed: boolean;
  fogbugz: string;
  checkItems: number;
  checkItemsChecked: number;
  checkItemsEarliestDue?: any;
  comments: number;
  attachments: number;
  description: boolean;
  due?: Date;
  dueComplete: boolean;
  start?: any;
}

export interface Label {
  id: string;
  idBoard: string;
  name: string;
  color: string;
}

export interface Cover {
  idAttachment?: any;
  color?: any;
  idUploadedBackground?: any;
  size: string;
  brightness: string;
  idPlugin?: any;
}

export interface MemberCards {
  id: string;
  checkItemStates?: any;
  closed: boolean;
  dateLastActivity: Date;
  desc: string;
  descData: DescData;
  dueReminder?: number;
  idBoard: string;
  idList: string;
  idMembersVoted: any[];
  idShort: number;
  idAttachmentCover?: any;
  idLabels: string[];
  manualCoverAttachment: boolean;
  name: string;
  pos: number;
  shortLink: string;
  isTemplate: boolean;
  cardRole?: any;
  badges: Badges;
  dueComplete: boolean;
  due?: Date;
  idChecklists: any[];
  idMembers: string[];
  labels: Label[];
  shortUrl: string;
  start?: any;
  subscribed: boolean;
  url: string;
  cover: Cover;
}
