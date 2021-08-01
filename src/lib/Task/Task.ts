import type { PieceContext, PieceOptions } from "@sapphire/pieces";
import { Piece } from "@sapphire/pieces";
import { schedule, ScheduledTask, validate } from "node-cron";

//https://github.com/EFREI-Horizon/MonkaBot

export abstract class Task extends Piece {
  public readonly cron?: string;
  private _scheduleCron: ScheduledTask;
  private readonly _callback: (() => Promise<void>) | null;

  protected constructor(context: PieceContext, options: TaskOptions) {
    super(context, options);

    this.cron = validate(options.cron) ? options.cron : null;
    this._callback = this._run.bind(this);
  }

  public onLoad(): void {
    this._scheduleCron = schedule(this.cron, this._callback);
  }

  public onUnload(): void {
    if (this._scheduleCron) this._scheduleCron.stop().destroy();
  }

  public toJSON(): Record<PropertyKey, unknown> {
    return {
      ...super.toJSON(),
      cron: this.cron,
    };
  }

  public abstract run(): unknown;

  private async _run(): Promise<void> {
    try {
      await this.run();
    } catch (error: unknown) {
      // this.container.client.emit(Events.TaskError, error as Error, { piece: this });
    }
  }
}

export type TaskOptions = | PieceOptions & { cron: string }