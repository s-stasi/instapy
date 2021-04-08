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
var fs = require("fs");
var bot_1 = require("./bot");
;
;
var BotData = /** @class */ (function () {
    function BotData(username, password) {
        console.log(fs.readFileSync('./data/tags_and_accounts.json'));
        this.found_accounts = (fs.readFileSync('./data/found_accounts.json')) ? JSON.parse(fs.readFileSync('./data/found_accounts.json').toString()) : { accounts: [] };
        this.tags_and_accounts = (fs.readFileSync('./data/tags_and_accounts.json')) ? JSON.parse(fs.readFileSync('./data/tags_and_accounts.json').toString()) : { accounts: [] };
        this.username = username;
        this.password = password;
    }
    BotData.prototype.getList = function () {
        return this.tags_and_accounts.accounts;
    };
    BotData.prototype.checkAccount = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var account, bot, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        account = {
                            username: username,
                            followers: 0,
                            followed: 0,
                            done: false
                        };
                        bot = new bot_1["default"](this.username, this.password);
                        return [4 /*yield*/, bot.open()];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, bot.searchUser(username)];
                    case 2:
                        _c.sent();
                        _a = account;
                        return [4 /*yield*/, bot.getFollowersNumber()];
                    case 3:
                        _a.followers = _c.sent();
                        _b = account;
                        return [4 /*yield*/, bot.getFollowedNumber()];
                    case 4:
                        _b.followed = _c.sent();
                        return [2 /*return*/, account];
                }
            });
        });
    };
    BotData.prototype.addFound = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var isIn;
            var _this = this;
            return __generator(this, function (_a) {
                isIn = false;
                this.checkAccount(username)
                    .then(function (acc) {
                    for (var _i = 0, _a = _this.found_accounts.accounts; _i < _a.length; _i++) {
                        var i = _a[_i];
                        if (acc.username == i.username) {
                            isIn = true;
                        }
                    }
                    if (isIn)
                        return;
                    _this.found_accounts.accounts.push(acc);
                });
                return [2 /*return*/];
            });
        });
    };
    BotData.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                fs.writeFileSync('./data/found_accounts.json', JSON.stringify(this.found_accounts));
                return [2 /*return*/];
            });
        });
    };
    return BotData;
}());
exports["default"] = BotData;
