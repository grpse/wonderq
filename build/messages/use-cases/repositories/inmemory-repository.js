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
exports.InMemoryRepository = void 0;
var uuid_1 = require("uuid");
var InMemoryRepository = (function () {
    function InMemoryRepository() {
        this.store = {};
    }
    InMemoryRepository.prototype.find = function (clause, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var resultStorePack, _i, _a, data, shouldAddToResult, _b, _c, key;
            return __generator(this, function (_d) {
                resultStorePack = [];
                for (_i = 0, _a = Object.values(this.store); _i < _a.length; _i++) {
                    data = _a[_i];
                    shouldAddToResult = true;
                    for (_b = 0, _c = Object.keys(clause); _b < _c.length; _b++) {
                        key = _c[_b];
                        if (data[key] !== clause[key]) {
                            shouldAddToResult = false;
                            break;
                        }
                    }
                    if (shouldAddToResult) {
                        resultStorePack.push(__assign({}, data));
                    }
                }
                return [2, resultStorePack.slice(0, limit)];
            });
        });
    };
    InMemoryRepository.prototype.save = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                id = data.id || uuid_1.v4();
                this.store[id] = __assign(__assign({}, data), { id: id });
                return [2, { id: id }];
            });
        });
    };
    InMemoryRepository.prototype.update = function (ids, fieldsValues) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, ids_1, id, _a, _b, field;
            var _c;
            return __generator(this, function (_d) {
                for (_i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
                    id = ids_1[_i];
                    if (this.store[id]) {
                        for (_a = 0, _b = Object.keys(fieldsValues); _a < _b.length; _a++) {
                            field = _b[_a];
                            this.store[id] = __assign(__assign({}, this.store[id]), (_c = {}, _c[field] = fieldsValues[field], _c));
                        }
                    }
                }
                return [2];
            });
        });
    };
    InMemoryRepository.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                delete this.store[id];
                return [2];
            });
        });
    };
    return InMemoryRepository;
}());
exports.InMemoryRepository = InMemoryRepository;
//# sourceMappingURL=inmemory-repository.js.map