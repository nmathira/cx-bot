import {AkairoClient, AkairoHandlerOptions} from "discord-akairo";

const {AkairoHandler} = require("discord-akairo");
/*
interface scheduleOptions extends AkairoHandlerOptions{

}
*/
export default class ScheduleHandler extends AkairoHandler {
  constructor(client: AkairoClient, options: AkairoHandlerOptions) {
    super(client, options);
  }

}
