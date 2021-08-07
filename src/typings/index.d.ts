import type { CommandOptions } from "@sapphire/framework";

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
