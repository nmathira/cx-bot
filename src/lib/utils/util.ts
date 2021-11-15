import { exec as childProcessExec } from "child_process";
import type { safeExecResult, catApiResult } from "../../typings";
import { promisify } from "util";
import { fetch, FetchResultTypes } from "@sapphire/fetch";

export async function safeExec(command: string): Promise<safeExecResult> {
  try {
    const result = await exec(command);
    return { ...result, exitCode: 0, err: null };
  } catch (err) {
    return {
      err: err as Error,
      stdout: "",
      stderr: (err as Error).message,
      exitCode: ((err as Error & { code: number }).code ?? 1) as number,
    };
  }
}

export async function getCat(): Promise<string> {
  let cat = await fetch<catApiResult>(
    "https://api.thecatapi.com/v1/images/search?api_key=16ff346b-d8eb-47ff-8c46-97ff92f549be",
    FetchResultTypes.JSON,
  );
  return cat.url;
}

const exec = promisify(childProcessExec);
