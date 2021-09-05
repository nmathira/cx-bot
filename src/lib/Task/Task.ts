import type { PieceContext, PieceOptions } from "@sapphire/pieces";
import { Piece } from "@sapphire/pieces";
import type { ScheduledTask } from "node-cron";
import { schedule, validate } from "node-cron";
import { Events } from "@typings/index";

export abstract class Task extends Piece {
  public readonly cronTime?: string;
  private cronJob: ScheduledTask;
  private readonly cronCallback: (() => Promise<void>) | null;

  protected constructor(context: PieceContext, options: TaskOptions) {
    super(context, options);

    this.cronTime = validate(options.cron) ? options.cron : null;
    this.cronCallback = this._run.bind(this);
  }

  public onLoad(): void {
    this.cronJob = schedule(this.cronTime, this.cronCallback);
  }

  public onUnload(): void {
    if (this.cronJob) this.cronJob.stop().destroy();
  }

  public toJSON(): Record<PropertyKey, unknown> {
    return {
      ...super.toJSON(),
      cron: this.cronTime,
    };
  }

  public abstract run(): unknown;

  private async _run(): Promise<void> {
    try {
      await this.run();
    } catch (error: unknown) {
      this.container.client.emit(Events.TaskError, error as Error, {
        piece: this,
      });
    }
  }
}

export type TaskOptions = PieceOptions & { cron: string };
