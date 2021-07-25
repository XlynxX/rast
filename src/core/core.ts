import ApiHelper from "../utils/apiHelper";
import { colors } from "./colors/colors";
import * as fs from 'fs';

class RastCore {
  api: ApiHelper;
  currentView: number;
  
  constructor() {
    console.log('RastCore initialization');
    console.log(fs.existsSync('./config.json'));
    this.api = new ApiHelper();
    this.currentView = 0;
  }

  LOG = (message: string) => {
    console.log(colors.FgGreen + message + colors.Reset);
  }

  processEvent = (eventName: string, args: any) => {
    switch (eventName) {
      case "login": {
        this.api.apiLogin(args.login, args.password).then( (promise) => {
          console.log(promise);
        });
        break;
      }
    
      default:
        break;
    }
  }
}

module.exports.RastCore = RastCore;