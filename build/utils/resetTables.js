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
/**
 * @description Resets all of the database tables to use the database again in other test suites
 */
function resetTables() {
    return __awaiter(this, void 0, void 0, function () {
        /**
         * @description Drops the order_product table to wipe the data inside
         */
        function dropOrderProduct() {
            return __awaiter(this, void 0, void 0, function () {
                var sql;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            sql = "DROP TABLE order_product";
                            return [4 /*yield*/, conn.query(sql)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
        /**
         * @description Drops the orders table to wipe the data inside
         */
        function dropOrders() {
            return __awaiter(this, void 0, void 0, function () {
                var sql;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            sql = "DROP TABLE orders";
                            return [4 /*yield*/, conn.query(sql)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
        /**
         * @description Drops the products table to wipe the data inside
         */
        function dropProducts() {
            return __awaiter(this, void 0, void 0, function () {
                var conn, sql;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, database_1.default.connect()];
                        case 1:
                            conn = _a.sent();
                            sql = "DROP TABLE products";
                            return [4 /*yield*/, conn.query(sql)];
                        case 2:
                            _a.sent();
                            conn.release();
                            return [2 /*return*/];
                    }
                });
            });
        }
        /**
         * @description Drops the users table to wipe the data inside
         */
        function dropUsers() {
            return __awaiter(this, void 0, void 0, function () {
                var sql;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            sql = "DROP TABLE users";
                            return [4 /*yield*/, conn.query(sql)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
        /**
         * @description Creates a new users table
         */
        function createUsers() {
            return __awaiter(this, void 0, void 0, function () {
                var sql;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            sql = "CREATE TABLE users (id SERIAL PRIMARY KEY,email VARCHAR(255) NOT NULL,firstName VARCHAR(32) NOT NULL,lastName VARCHAR(32) NOT NULL,password varchar(512) NOT NULL)";
                            return [4 /*yield*/, conn.query(sql)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
        /**
         * @description Creates a new products table
         */
        function createProducts() {
            return __awaiter(this, void 0, void 0, function () {
                var conn, sql;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, database_1.default.connect()];
                        case 1:
                            conn = _a.sent();
                            sql = "CREATE TABLE products (id SERIAL PRIMARY KEY,name VARCHAR(255) NOT NULL,price integer NOT NULL,category VARCHAR(128) NOT NULL,order_counter BIGINT DEFAULT 0)";
                            return [4 /*yield*/, conn.query(sql)];
                        case 2:
                            _a.sent();
                            conn.release();
                            return [2 /*return*/];
                    }
                });
            });
        }
        /**
         * @description Creates a new orders table
         */
        function createOrders() {
            return __awaiter(this, void 0, void 0, function () {
                var sql;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            sql = "CREATE TABLE orders (id SERIAL PRIMARY KEY,status VARCHAR(64) NOT NULL,user_id BIGINT NOT NULL REFERENCES users(id))";
                            return [4 /*yield*/, conn.query(sql)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
        /**
         * @description Creates a new order_product table
         */
        function createOrderProduct() {
            return __awaiter(this, void 0, void 0, function () {
                var sql;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            sql = "CREATE TABLE order_product (id SERIAL PRIMARY KEY,quantity INTEGER NOT NULL,order_id BIGINT NOT NULL REFERENCES orders(id),product_id BIGINT NOT NULL REFERENCES products(id))";
                            return [4 /*yield*/, conn.query(sql)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
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
                    return [4 /*yield*/, dropOrderProduct()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, dropOrders()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, dropProducts()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, dropUsers()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, createUsers()];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, createProducts()];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, createOrders()];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, createOrderProduct()];
                case 9:
                    _a.sent();
                    conn.release();
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = resetTables;
