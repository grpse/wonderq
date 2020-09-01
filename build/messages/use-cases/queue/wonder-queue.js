"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WonderQ = void 0;
var WonderQ = (function () {
    function WonderQ(messagesRepo, settings) {
        this.messagesRepo = messagesRepo;
        this.settings = settings;
        this.mutex = false;
    }
    WonderQ.prototype.enqueue = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var messageData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        messageData = __assign({ id: '', locked: false }, message);
                        return [4, this.messagesRepo.save(messageData)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    WonderQ.prototype.getNext = function (amount) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var retryInterval_1, _a;
                        var _this = this;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!this.mutex) return [3, 1];
                                    retryInterval_1 = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                                        var _a;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    if (!!this.mutex) return [3, 2];
                                                    _a = resolve;
                                                    return [4, this.retrieveUnlockedMessages(amount)];
                                                case 1:
                                                    _a.apply(void 0, [_b.sent()]);
                                                    clearInterval(retryInterval_1);
                                                    _b.label = 2;
                                                case 2: return [2];
                                            }
                                        });
                                    }); }, 50);
                                    return [3, 3];
                                case 1:
                                    this.mutex = true;
                                    _a = resolve;
                                    return [4, this.retrieveUnlockedMessages(amount)];
                                case 2:
                                    _a.apply(void 0, [_b.sent()]);
                                    this.mutex = false;
                                    _b.label = 3;
                                case 3: return [2];
                            }
                        });
                    }); })];
            });
        });
    };
    WonderQ.prototype.process = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var found, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4, this.messagesRepo.find({ id: id, locked: true }, 1)];
                    case 1:
                        found = _a.sent();
                        if (!(found[0] && found[0].id === id)) return [3, 3];
                        return [4, this.messagesRepo.delete(id)];
                    case 2:
                        _a.sent();
                        return [2, true];
                    case 3: return [2, false];
                    case 4:
                        e_1 = _a.sent();
                        return [2, false];
                    case 5: return [2];
                }
            });
        });
    };
    WonderQ.prototype.retrieveUnlockedMessages = function (limit) {
        return __awaiter(this, void 0, void 0, function () {
            var unlockedMessages, unlockedMessagesIds, resetMessagesTimeout;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.messagesRepo.find({ locked: false }, limit)];
                    case 1:
                        unlockedMessages = _a.sent();
                        unlockedMessagesIds = unlockedMessages.map(function (message) { return message.id; });
                        return [4, this.messagesRepo.update(unlockedMessagesIds, { locked: true })];
                    case 2:
                        _a.sent();
                        resetMessagesTimeout = this.settings.getNumber('LOCK_MESSAGES_TIMEOUT');
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, this.messagesRepo.update(unlockedMessagesIds, { locked: false })];
                                    case 1:
                                        _a.sent();
                                        return [2];
                                }
                            });
                        }); }, resetMessagesTimeout);
                        return [2, unlockedMessages.map(function (message) { return ({
                                id: message.id,
                                data: message.data,
                            }); })];
                }
            });
        });
    };
    return WonderQ;
}());
exports.WonderQ = WonderQ;
//# sourceMappingURL=wonder-queue.js.map