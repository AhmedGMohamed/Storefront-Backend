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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = __importDefault(require("../database"));
function insertData() {
    return __awaiter(this, void 0, void 0, function () {
        /**
         * @description Inserts sample users into the database to be used in jasmine tests
         */
        function insertUsers() {
            return __awaiter(this, void 0, void 0, function () {
                var i, sql;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            i = 1;
                            _a.label = 1;
                        case 1:
                            if (!(i <= 3)) return [3 /*break*/, 4];
                            sql = "INSERT INTO users (email, firstName, lastName, password) VALUES ($1, $2, $3, $4)";
                            return [4 /*yield*/, conn.query(sql, [
                                    "user".concat(i, "@example.com"),
                                    "First Name".concat(i),
                                    "Last Name".concat(i),
                                    "password"
                                ])];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        /**
         * @description Inserts sample orders into the database to be used in jasmine tests
         */
        function insertOrders() {
            return __awaiter(this, void 0, void 0, function () {
                var i, sql;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            i = 1;
                            _a.label = 1;
                        case 1:
                            if (!(i <= 2)) return [3 /*break*/, 6];
                            sql = "INSERT INTO orders (status, user_id) VALUES ($1, $2)";
                            if (!(i % 2 === 0)) return [3 /*break*/, 3];
                            return [4 /*yield*/, conn.query(sql, ["open", "".concat(i)])];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 3: return [4 /*yield*/, conn.query(sql, ["closed", "".concat(i)])];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            i++;
                            return [3 /*break*/, 1];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        }
        /**
         * @description Inserts sample products into the database to be used in jasmine tests
         */
        function insertProducts() {
            return __awaiter(this, void 0, void 0, function () {
                var i, sql;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            i = 1;
                            _a.label = 1;
                        case 1:
                            if (!(i <= 2)) return [3 /*break*/, 4];
                            sql = "INSERT INTO products (name, price, category, order_counter) VALUES ($1, $2, $3, $4)";
                            return [4 /*yield*/, conn.query(sql, ["Name".concat(i), i, "Category".concat(i), i])];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        var conn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    conn = _a.sent();
                    return [4 /*yield*/, insertUsers()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, insertOrders()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, insertProducts()];
                case 4:
                    _a.sent();
                    conn.release();
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = insertData;
