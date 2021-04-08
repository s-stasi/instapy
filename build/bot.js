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
var puppeteer = require("puppeteer");
var Bot = /** @class */ (function () {
    function Bot(username, password) {
        this.chromedriver_path = 'C:/dev/instapy/bin/';
        this.intagram_url = 'https://instagram.com/';
        this.username = null;
        this.password = null;
        this.iPhone = puppeteer.devices['iPhone 6'];
        this.driver = {};
        this.page = null;
        this.start_time = Date.now();
        this.username = username;
        this.password = password;
    }
    Bot.prototype.open = function () {
        return __awaiter(this, void 0, void 0, function () {
            var browser, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, puppeteer.launch({ headless: false })];
                    case 1:
                        browser = _d.sent();
                        _a = this;
                        return [4 /*yield*/, browser.newPage()];
                    case 2:
                        _a.page = _d.sent();
                        return [4 /*yield*/, this.page.emulate(this.iPhone)];
                    case 3:
                        _d.sent();
                        return [4 /*yield*/, this.page.goto(this.intagram_url)];
                    case 4:
                        _d.sent();
                        _c = (_b = console).log;
                        return [4 /*yield*/, this.page.title()];
                    case 5:
                        _c.apply(_b, [_d.sent()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    Bot.prototype.acceptCookies = function () {
        return __awaiter(this, void 0, void 0, function () {
            var accept;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.$x('//body/div[2]/div[1]/div[1]/div[1]/div[2]/button[1]')];
                    case 1:
                        accept = (_a.sent())[0];
                        if (!accept) return [3 /*break*/, 3];
                        return [4 /*yield*/, accept.tap()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        console.error('Failed to click accept cookie button');
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Bot.prototype.clickAccedi = function () {
        return __awaiter(this, void 0, void 0, function () {
            var accedi;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.waitForXPath('//*[@id=\'react-root\']/section[1]/main[1]/article[1]/div[1]/div[1]/div[1]/div[2]/button[1]', {
                            timeout: 4000,
                            visible: true
                        })];
                    case 1:
                        accedi = _a.sent();
                        if (!accedi) return [3 /*break*/, 3];
                        return [4 /*yield*/, accedi.tap()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        console.error('Unable to click accedi button');
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Bot.prototype.handleNotificationRequest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var not_now_button;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.$x('//body/div[4]/div/div/div/div[3]/button[2]')];
                    case 1:
                        not_now_button = (_a.sent())[0];
                        if (!not_now_button) return [3 /*break*/, 3];
                        return [4 /*yield*/, not_now_button.tap()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        console.error('Failed to click not now notification button');
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Bot.prototype.saveAccessInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var not_now_button;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.$x('/html/body/div[1]/section/main/div[1]/div[1]/div[1]/button[1]')];
                    case 1:
                        not_now_button = (_a.sent())[0];
                        if (!not_now_button) return [3 /*break*/, 3];
                        return [4 /*yield*/, not_now_button.tap()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        console.error('Failed to click not now save info button');
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Bot.prototype.clickBody = function () {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.$x('//*[@id=\'react-root\']/section[1]/div[2]/div[1]/div[1]')];
                    case 1:
                        body = (_a.sent())[0];
                        if (!body) return [3 /*break*/, 3];
                        return [4 /*yield*/, body.tap()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        console.error('Failed to click body');
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Bot.prototype.doLogin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var login;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.acceptCookies()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.clickAccedi()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.page.waitForSelector("[name='username']")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.page.type("[name='username']", this.username)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.page.keyboard.down('Tab')];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.page.keyboard.type(this.password)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.page.$x('//*[@id=\'loginForm\']/div[1]/div[6]/button[1]')];
                    case 7:
                        login = (_a.sent())[0];
                        if (!login) return [3 /*break*/, 9];
                        return [4 /*yield*/, login.tap()];
                    case 8:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        console.error('Failed to click login button');
                        _a.label = 10;
                    case 10: return [4 /*yield*/, this.page.waitFor(8000)];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, this.saveAccessInfo()];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, this.page.waitForNavigation({
                                waitUntil: 'networkidle0'
                            })];
                    case 13:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Bot.prototype.goToDirect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.goto('https://www.instagram.com/direct/inbox')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.handleNotificationRequest()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.clickBody()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Bot.prototype.sendMessage = function (username, message) {
        return __awaiter(this, void 0, void 0, function () {
            var lclock, firsst_acc, avanti, exec_time, send;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lclock = Date.now();
                        // type on search box
                        return [4 /*yield*/, this.page.waitForXPath('//*[@id=\'react-root\']/section[1]/div[2]/div[1]/div[1]/div[1]/div[2]/input[1]')];
                    case 1:
                        // type on search box
                        _a.sent();
                        return [4 /*yield*/, this.page.type('//*[@id=\'react-root\']/section[1]/div[2]/div[1]/div[1]/div[1]/div[2]/input[1]', username)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.page.waitForXPath('//*[@id=\'react-root\']/section[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[3]/button[1]')];
                    case 3:
                        firsst_acc = _a.sent();
                        if (!firsst_acc) return [3 /*break*/, 5];
                        return [4 /*yield*/, firsst_acc.tap()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        console.error('Failed to click first account or account does not exist');
                        _a.label = 6;
                    case 6: return [4 /*yield*/, this.page.waitForXPath('//*[@id=\'react-root\']/section[1]/div[1]/header/div/div[2]/button')];
                    case 7:
                        avanti = _a.sent();
                        if (!avanti) return [3 /*break*/, 9];
                        return [4 /*yield*/, avanti.tap()];
                    case 8:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        console.error('Failed to click avanti button');
                        _a.label = 10;
                    case 10:
                        exec_time = (Date.now() - this.start_time) / 60;
                        if (!(exec_time % 20 == 0)) return [3 /*break*/, 12];
                        return [4 /*yield*/, setTimeout(function () { return true; }, 60 * 1000)];
                    case 11:
                        _a.sent();
                        _a.label = 12;
                    case 12:
                        if (!(exec_time % 117 == 0)) return [3 /*break*/, 14];
                        return [4 /*yield*/, setTimeout(function () { return true; }, 17 * 60 * 1000)];
                    case 13:
                        _a.sent();
                        return [3 /*break*/, 16];
                    case 14: return [4 /*yield*/, setTimeout(function () { return true; }, (Math.floor(Math.random() * (7.5 - 4 + 1)) + 4) * 1000)];
                    case 15:
                        _a.sent();
                        _a.label = 16;
                    case 16: 
                    // send mesage
                    return [4 /*yield*/, this.page.waitForXPath('//*[@id= \'react-root\']/section[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/textarea[1]')];
                    case 17:
                        // send mesage
                        _a.sent();
                        return [4 /*yield*/, this.page.type('//*[@id=\'react-root\']/section[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/textarea[1]', message)];
                    case 18:
                        _a.sent();
                        return [4 /*yield*/, this.page.waitForXPath('//*[@id=\'react-root\']/section[1]/div[1]/header[1]/div[1]/div[1]')];
                    case 19:
                        send = _a.sent();
                        if (!send) return [3 /*break*/, 21];
                        return [4 /*yield*/, send.tap()];
                    case 20:
                        _a.sent();
                        return [3 /*break*/, 22];
                    case 21:
                        console.error('Failed to send message');
                        _a.label = 22;
                    case 22: 
                    // todo data makedone 
                    return [4 /*yield*/, setTimeout(function () { return true; }, 2000)];
                    case 23:
                        // todo data makedone 
                        _a.sent();
                        console.log("This user took about " + (Date.now() - this.start_time));
                        return [2 /*return*/];
                }
            });
        });
    };
    Bot.prototype.scrollDown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var last_height, time, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('scrolldown');
                        return [4 /*yield*/, this.page.evaluate(function () {
                                return document.body.scrollHeight;
                            })];
                    case 1:
                        last_height = _b.sent();
                        _b.label = 2;
                    case 2:
                        if (!true) return [3 /*break*/, 10];
                        time = Date.now();
                        _b.label = 3;
                    case 3:
                        if (!true) return [3 /*break*/, 7];
                        _a = last_height;
                        return [4 /*yield*/, this.page.evaluate(function () { return document.body.scrollHeight; })];
                    case 4:
                        if (!(_a < (_b.sent()))) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.page.evaluate(function () { return document.body.scrollHeight; })];
                    case 5:
                        last_height = _b.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        if ((Date.now() - time) > 20 * 1000)
                            return [2 /*return*/];
                        return [3 /*break*/, 3];
                    case 7: return [4 /*yield*/, this.page.evaluate(function () { window.scrollTo(0, document.body.scrollHeight); })];
                    case 8:
                        _b.sent();
                        return [4 /*yield*/, setTimeout(function () { return true; }, (Math.floor(Math.random() * (1.65 - 0.58 + 1)) + 0.58) * 1000)];
                    case 9:
                        _b.sent();
                        console.log('scrolling');
                        return [3 /*break*/, 2];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    Bot.prototype.searchHashtag = function (hashtag) {
        return __awaiter(this, void 0, void 0, function () {
            var hashtag_url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hashtag_url = this.intagram_url + 'explore/tags/' + hashtag;
                        return [4 /*yield*/, this.page.goto(hashtag_url)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Bot.prototype.searchUser = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var username_url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username_url = this.intagram_url + username;
                        return [4 /*yield*/, this.page.goto(username_url)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Bot.prototype.getFollowedNumber = function () {
        return __awaiter(this, void 0, void 0, function () {
            var followed, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.page.waitForXPath('//*[@id=\'react-root\']/section[1]/main[1]/div[1]/ul[1]/li[3]/a[1]/span[1]')];
                    case 1:
                        followed = _b.sent();
                        if (!followed) return [3 /*break*/, 3];
                        _a = parseInt;
                        return [4 /*yield*/, this.page.evaluate(function (el) { return el.textContent; }, followed)];
                    case 2: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                    case 3:
                        console.error('Unable to get followed number');
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Bot.prototype.getFollowersNumber = function () {
        return __awaiter(this, void 0, void 0, function () {
            var followed, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.page.waitForXPath('//*[@id=\'react-root\']/section[1]/main[1]/div[1]/ul[1]/li[2]/a[1]/span[1]')];
                    case 1:
                        followed = _b.sent();
                        if (!followed) return [3 /*break*/, 3];
                        _a = parseInt;
                        return [4 /*yield*/, this.page.evaluate(function (el) { return el.textContent; }, followed)];
                    case 2: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                    case 3:
                        console.error('Unable to get followers number');
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Bot.prototype.getFollowersList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var count, str_list, followers_button, list, _i, list_1, i, username;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        count = 0;
                        return [4 /*yield*/, this.page.waitForXPath('//*[@id=\'react-root\']/section[1]/main[1]/div[1]/ul[1]/li[2]/a[1]/span[1]')];
                    case 1:
                        followers_button = _a.sent();
                        if (!followers_button) return [3 /*break*/, 3];
                        return [4 /*yield*/, followers_button.tap()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        console.error('Unable to click followers button');
                        _a.label = 4;
                    case 4: return [4 /*yield*/, setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.scrollDown()];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, 6 * 1000)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.page.$$('a .notranslate')];
                    case 6:
                        list = _a.sent();
                        _i = 0, list_1 = list;
                        _a.label = 7;
                    case 7:
                        if (!(_i < list_1.length)) return [3 /*break*/, 10];
                        i = list_1[_i];
                        count++;
                        return [4 /*yield*/, this.page.evaluate(function (el) { return el.textContent; }, i)];
                    case 8:
                        username = _a.sent();
                        str_list.push(username);
                        console.log('Username: ' + username);
                        _a.label = 9;
                    case 9:
                        _i++;
                        return [3 /*break*/, 7];
                    case 10:
                        console.log('Found ' + count.toString() + 'accounts');
                        return [2 /*return*/, str_list];
                }
            });
        });
    };
    Bot.prototype.getFollowedList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var count, str_list, followers_button, list, obj_list, i, name;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        count = 0;
                        return [4 /*yield*/, this.page.waitForXPath('//*[@id=\'react-root\']/section[1]/main[1]/div[1]/ul[1]/li[3]/a[1]/span[1]')];
                    case 1:
                        followers_button = _a.sent();
                        if (!followers_button) return [3 /*break*/, 3];
                        return [4 /*yield*/, followers_button.tap()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        console.error('Unable to click followed button');
                        _a.label = 4;
                    case 4:
                        console.log('clicked followed button');
                        console.log('strarting timeout of 6 sec');
                        return [4 /*yield*/, setTimeout(function () { }, 6 * 1000)];
                    case 5:
                        _a.sent();
                        console.log('finished timeout');
                        console.log('scrolling..');
                        return [4 /*yield*/, this.scrollDown()];
                    case 6:
                        _a.sent();
                        console.log('done');
                        return [4 /*yield*/, this.page.$$('li')];
                    case 7:
                        list = _a.sent();
                        console.log(list);
                        obj_list = { list: list, length: list.length };
                        console.log(obj_list.list.length);
                        i = 0;
                        _a.label = 8;
                    case 8:
                        if (!(i < obj_list.length)) return [3 /*break*/, 11];
                        return [4 /*yield*/, obj_list.list[i].$eval('div div div div a', function (node) { return node.textContent; })];
                    case 9:
                        name = _a.sent();
                        count++;
                        console.log('here');
                        str_list.list.push(name);
                        console.log(str_list);
                        console.log('Username: ' + name);
                        _a.label = 10;
                    case 10:
                        i++;
                        return [3 /*break*/, 8];
                    case 11:
                        console.log('Found ' + count.toString() + ' accounts');
                        return [2 /*return*/, str_list.list];
                }
            });
        });
    };
    Bot.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.close()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Bot;
}());
exports["default"] = Bot;
