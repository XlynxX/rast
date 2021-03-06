"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var apiHelper_1 = require("../utils/apiHelper");
var configHelper_1 = require("../utils/configHelper");
var RastCore = /** @class */ (function () {
    function RastCore() {
        console.log('RastCore initialization');
        this.configHelper = new configHelper_1["default"]();
        this.tokenExists = this.configHelper.config.token !== null ? true : false;
        this.api = new apiHelper_1["default"](this.tokenExists === true ? this.configHelper.config.token : '');
        this.currentView = 0;
    }
    RastCore.prototype.processEvent = function (eventName, args) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = eventName;
                        switch (_a) {
                            case "login": return [3 /*break*/, 1];
                            case "get_users": return [3 /*break*/, 3];
                            case "get_messages": return [3 /*break*/, 5];
                            case "send_message": return [3 /*break*/, 7];
                            case "get_channels": return [3 /*break*/, 9];
                        }
                        return [3 /*break*/, 11];
                    case 1: return [4 /*yield*/, this.api.apiLogin(args.login, args.password)];
                    case 2:
                        response = _b.sent();
                        this.configHelper.config.token = response;
                        this.configHelper.saveConfig();
                        return [2 /*return*/, response !== undefined && response !== '' ? true : false];
                    case 3: return [4 /*yield*/, this.api.getUsers()];
                    case 4: return [2 /*return*/, _b.sent()];
                    case 5: return [4 /*yield*/, this.api.getMessages(args.channelID)];
                    case 6: return [2 /*return*/, _b.sent()];
                    case 7: return [4 /*yield*/, this.api.sendMessage(args.channelID, args.content)];
                    case 8: return [2 /*return*/, _b.sent()];
                    case 9: return [4 /*yield*/, this.api.getChannels()];
                    case 10: return [2 /*return*/, _b.sent()];
                    case 11: return [2 /*return*/, null];
                }
            });
        });
    };
    return RastCore;
}());
module.exports.RastCore = RastCore;
