import ApiHelper from "../utils/apiHelper";
import ConfigHelper from "../utils/configHelper";
import { colors } from "./colors/colors";

class RastCore {
  configHelper: ConfigHelper;
  api: ApiHelper;
  currentView: number;
  tokenExists: boolean;

  constructor() {
    console.log('RastCore initialization');
    this.configHelper = new ConfigHelper();
    this.tokenExists = this.configHelper.config.token !== null ? true : false;
    this.api = new ApiHelper(this.tokenExists === true ? this.configHelper.config.token : '');
    this.currentView = 0;
  }

  async processEvent(eventName: string, args: any) {
    switch (eventName) {
      case "login": {
        const response = await this.api.apiLogin(args.login, args.password);
        
        this.configHelper.config.token = response;
        this.configHelper.saveConfig();
        return response !== undefined && response !== '' ? true : false;
      }
      case "get_users": {
        return await this.api.getUsers();
      }
      case "get_messages": {
        return await this.api.getMessages(args.channelID);
      }
      case "send_message": {
        return await this.api.sendMessage(args.channelID, args.content)
      }
      case "get_channels": {
        return await this.api.getChannels();
      }

      default:
        return null;
    }
  }
}

module.exports.RastCore = RastCore;