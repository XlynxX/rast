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
require("axios");
var axios_1 = require("axios");
var colors_1 = require("../core/colors/colors");
var ApiHelper = /** @class */ (function () {
    function ApiHelper(token) {
        if (token === void 0) { token = ''; }
        this.token = token;
        // if token is not empty
        if (token !== '') {
            this.headers = {
                'Content-type': 'application/json',
                'Accept': 'text/plain',
                'Authorization': this.token
            };
            return;
        }
        // if token is empty
        this.headers = {
            'Content-type': 'application/json',
            'Accept': 'text/plain'
        };
    }
    ApiHelper.prototype.apiLogin = function (login, password) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, response, reason_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        payload = {
                            "login": login,
                            "password": password,
                            "undelete": false,
                            "captcha_key": null,
                            "login_source": null,
                            "gift_code_sku_id": null
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1["default"].post('https://discord.com/api/v9/auth/login', payload, { headers: this.headers })];
                    case 2:
                        response = _a.sent();
                        if (response.status == 200) {
                            this.token = response.data.token;
                            this.headers = {
                                'Content-type': 'application/json',
                                'Accept': 'text/plain',
                                'Authorization': this.token
                            };
                            return [2 /*return*/, this.token];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        reason_1 = _a.sent();
                        console.log(colors_1.colors.FgRed + 'An error has occured while trying to login\n' + reason_1 + colors_1.colors.Reset);
                        return [2 /*return*/, ''];
                    case 4: return [2 /*return*/, ''];
                }
            });
        });
    };
    ApiHelper.prototype.getUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, reason_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1["default"].get('https://discord.com/api/v9/users/@me/affinities/users', { headers: this.headers })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        reason_2 = _a.sent();
                        console.log(colors_1.colors.FgRed + 'An error has occured while trying to get users\nError: ' + reason_2.response.data.message + colors_1.colors.Reset);
                        return [2 /*return*/, ''];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ApiHelper.prototype.getMessages = function (channelID, limit) {
        if (channelID === void 0) { channelID = 0; }
        if (limit === void 0) { limit = 50; }
        return __awaiter(this, void 0, void 0, function () {
            var response, reason_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1["default"].get("https://discord.com/api/v9/channels/" + channelID + "/messages", { params: { limit: limit }, headers: this.headers })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        reason_3 = _a.sent();
                        console.log(colors_1.colors.FgRed + 'An error has occured while trying to get messages\nError: ' + reason_3.response.data.message + colors_1.colors.Reset);
                        return [2 /*return*/, ''];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ApiHelper.prototype.sendMessage = function (channelID, content, nonce, tts) {
        if (channelID === void 0) { channelID = 0; }
        if (nonce === void 0) { nonce = (Math.random() * 100000000000); }
        if (tts === void 0) { tts = false; }
        return __awaiter(this, void 0, void 0, function () {
            var payload, response, reason_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        payload = {
                            "content": content,
                            "nonce": nonce.toString(),
                            "tts": tts
                        };
                        return [4 /*yield*/, axios_1["default"].post("https://discord.com/api/v9/channels/" + channelID + "/messages", payload, { headers: this.headers })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        reason_4 = _a.sent();
                        console.log(colors_1.colors.FgRed + 'An error has occured while trying to send message\nError: ' + reason_4.response.data.message + colors_1.colors.Reset);
                        return [2 /*return*/, ''];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ApiHelper.prototype.getChannels = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, reason_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1["default"].get("https://discord.com/api/v9/users/@me/channels", { headers: this.headers })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        reason_5 = _a.sent();
                        console.log(colors_1.colors.FgRed + 'An error has occured while trying to send message\nError: ' + reason_5.response.data.message + colors_1.colors.Reset);
                        return [2 /*return*/, ''];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ApiHelper;
}());
exports["default"] = ApiHelper;
