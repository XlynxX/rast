"use strict";
exports.__esModule = true;
var apiHelper_1 = require("../utils/apiHelper");
var colors_1 = require("./colors/colors");
var RastCore = /** @class */ (function () {
    function RastCore() {
        var _this = this;
        this.LOG = function (message) {
            console.log(colors_1.colors.FgGreen + message + colors_1.colors.Reset);
        };
        this.processEvent = function (eventName, args) {
            switch (eventName) {
                case "login": {
                    _this.api.apiLogin(args.login, args.password).then(function (promise) {
                        console.log(_this.api.token);
                    });
                    break;
                }
                default:
                    break;
            }
        };
        console.log('RastCore initialization');
        this.api = new apiHelper_1["default"]();
        this.currentView = 0;
    }
    return RastCore;
}());
module.exports.RastCore = RastCore;
