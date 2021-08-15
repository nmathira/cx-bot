import { exec as childProcessExec } from "child_process";
import type { safeExecResult } from "../../typings";
import { promisify } from "util";

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

const exec = promisify(childProcessExec);
