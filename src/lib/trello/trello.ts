import fetch, { FetchResultTypes } from "@sapphire/fetch";
import type { Snowflake } from "discord.js";
import type { boardMember, MemberCards } from "@typings/index";
import type { PrismaClient } from "@prisma/client";

export async function getMembersFromBoard(
  boardId = process.env.TRELLO_BOARD_ID,
  key = process.env.TRELLO_KEY,
  token = process.env.TRELLO_TOKEN
): Promise<boardMember[]> {
  const members = await fetch<boardMember[]>(
    `https://api.trello.com/1/boards/${boardId}/members?key=${key}&token=${token}`,
    FetchResultTypes.JSON
  );
  return members;
}

export async function getCardsForMember(
  trelloId: string,
  boardId = process.env.TRELLO_BOARD_ID,
  key = process.env.TRELLO_KEY,
  token = process.env.TRELLO_TOKEN
): Promise<MemberCards[]> {
  const cards = await fetch<MemberCards[]>(
    `https://api.trello.com/1/members/${trelloId}/cards?key=${key}&token=${token}`,
    FetchResultTypes.JSON
  );
  return cards.filter(val => val.idBoard === boardId && !val.dueComplete);
}

export async function getTrelloIdFromDiscordId(
  user: Snowflake,
  prisma: PrismaClient
): Promise<string> {
  const data = await prisma.trelloUser.findFirst({
    where: { discordId: user.toString() },
  });
  return data.trelloId;
}