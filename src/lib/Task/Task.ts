import { Piece, PieceContext, PieceOptions } from "@sapphire/pieces";
import { Awaited } from "@sapphire/framework";
import { schedule, ScheduledTask, validate } from "node-cron";

export interface TaskOptions extends PieceOptions {
  interval?: string;
}

export abstract class Task extends Piece {
  private readonly interval: string;
  private readonly cron: ScheduledTask;

  protected constructor(context: PieceContext, options: TaskOptions = {}) {
    super(context, options);
    this.interval = validate(options.interval) ? options.interval : "* * * * *";
    this.cron = schedule(this.interval, this.run);
  }

  public abstract run(...args: readonly unknown[]): Awaited<void>;

  public onLoad(): Awaited<unknown> {
    this.cron.start();
    return super.onLoad();
  }

  public onUnload(): Awaited<unknown> {
    this.cron.stop();
    return super.onUnload();
  }

  public toJSON(): Record<string, any> {
    return {
      ...super.toJSON(),
      cron: this.cron,
      interval: this.interval,
    };
  }
}