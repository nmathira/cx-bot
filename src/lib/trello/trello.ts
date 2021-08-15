import fetch from "@sapphire/fetch";
import { FetchResultTypes } from "@sapphire/fetch";
import type { boardMember, trelloMember } from "@typings/index";

export async function getMembersFromBoard(
  boardId = process.env.TRELLO_BOARD_ID,
  key = process.env.TRELLO_KEY,
  token = process.env.TRELLO_TOKEN
): Promise<trelloMember[]> {
  const members = await fetch<boardMember[]>(
    `https://api.trello.com/1/boards/${boardId}/members?key=${key}&token=${token}`,
    FetchResultTypes.JSON
  );
  members.forEach((member) => delete member.fullName);
  return members;
}