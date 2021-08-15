import { Task } from "./Task";
import type { Constructor } from "@sapphire/utilities";
import { Store } from "@sapphire/pieces";

export class TaskStore extends Store<Task> {
  constructor() {
    super(Task as Constructor<Task>, { name: "tasks" });
  }
}
