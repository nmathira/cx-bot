import { Store } from "@sapphire/pieces";
import { Task } from "./Task";

export class TaskStore extends Store<Task> {
  public constructor() {
    super(Task as any, {name: "tasks"});
  }
}