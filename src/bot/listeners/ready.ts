import { Listener } from "@sapphire/framework";

export default class ready extends Listener {
  //TODO: Figure out what exactly this context thingy is
  public constructor(context: any) {
    super(context, {
      once: true,
    });
  }

  public async run() {
    this.container.logger.info("Successfully logged in!");
  }
}