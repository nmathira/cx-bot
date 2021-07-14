import {Listener} from "discord-akairo";

export default class ReadyListener extends Listener {
  public constructor() {
    super("ready", {
      emitter: "client",
      event: "ready",
      category: "client",
    });
  }

  public async exec(): Promise<void> {
    console.log(`${this.client.user!.tag} is now ready`);
    console.log(`Logged in as ${this.client.user!.tag} (${this.client.user!.id})`);

  }
}
