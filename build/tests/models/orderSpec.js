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
var order_1 = require("../../models/order");
var database_1 = __importDefault(require("../../database"));
var insertMockupData_1 = __importDefault(require("../../utils/insertMockupData"));
var resetTables_1 = __importDefault(require("../../utils/resetTables"));
describe("Order model test suite", function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, insertMockupData_1.default)()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, resetTables_1.default)()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should return a resolved promise with an array of orders", function () { return __awaiter(void 0, void 0, void 0, function () {
        var Orders, result, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    Orders = new order_1.OrderStore();
                    _b = (_a = JSON).stringify;
                    return [4 /*yield*/, Orders.index()];
                case 1:
                    result = _b.apply(_a, [_c.sent()]);
                    expect(result).toEqual('[{"id":1,"status":"closed","user_id":"1"},{"id":2,"status":"open","user_id":"2"}]');
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should return a resolved promise with one order of id 1", function () { return __awaiter(void 0, void 0, void 0, function () {
        var Orders, result, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    Orders = new order_1.OrderStore();
                    _b = (_a = JSON).stringify;
                    return [4 /*yield*/, Orders.show(1)];
                case 1:
                    result = _b.apply(_a, [_c.sent()]);
                    expect(result).toEqual('{"id":1,"status":"closed","user_id":"1"}');
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should insert a new order that has the specified values", function () { return __awaiter(void 0, void 0, void 0, function () {
        var o, Orders, result, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    o = {
                        status: "Status4",
                        user_id: "3"
                    };
                    Orders = new order_1.OrderStore();
                    _b = (_a = JSON).stringify;
                    return [4 /*yield*/, Orders.create(o)];
                case 1:
                    result = _b.apply(_a, [_c.sent()]);
                    expect(result).toEqual('{"id":3,"status":"Status4","user_id":"3"}');
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should edit the previous order's status into Status3", function () { return __awaiter(void 0, void 0, void 0, function () {
        var o, Orders, result, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    o = {
                        id: "3",
                        status: "Status3",
                        user_id: "3"
                    };
                    Orders = new order_1.OrderStore();
                    _b = (_a = JSON).stringify;
                    return [4 /*yield*/, Orders.update(o)];
                case 1:
                    result = _b.apply(_a, [_c.sent()]);
                    expect(result).toEqual('{"id":3,"status":"Status3","user_id":"3"}');
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should delete the order with id 3", function () { return __awaiter(void 0, void 0, void 0, function () {
        var Orders, result, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    Orders = new order_1.OrderStore();
                    _b = (_a = JSON).stringify;
                    return [4 /*yield*/, Orders.delete(3)];
                case 1:
                    result = _b.apply(_a, [_c.sent()]);
                    expect(result).toEqual('{"id":3,"status":"Status3","user_id":"3"}');
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should return an array with one order using the user_id of 2", function () { return __awaiter(void 0, void 0, void 0, function () {
        var Orders, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Orders = new order_1.OrderStore();
                    return [4 /*yield*/, Orders.orderUser("2")];
                case 1:
                    result = _a.sent();
                    expect(JSON.stringify(result)).toContain('[{"id":2,"status":"open","user_id":"2"}]');
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should create an item in the order_product table and increase the order_counter count", function () { return __awaiter(void 0, void 0, void 0, function () {
        var order, sql, conn, Orders, result, count, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    order = {
                        quantity: 5,
                        product_id: "1",
                        order_id: "1"
                    };
                    sql = "SELECT order_counter FROM products WHERE id = $1";
                    return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    conn = _b.sent();
                    Orders = new order_1.OrderStore();
                    return [4 /*yield*/, Orders.addProductOrder(order)];
                case 2:
                    result = _b.sent();
                    _a = parseInt;
                    return [4 /*yield*/, conn.query(sql, [order.order_id])];
                case 3:
                    count = _a.apply(void 0, [(_b.sent()).rows[0].order_counter]);
                    conn.release();
                    expect(JSON.stringify(result)).toContain('"order_id":"1","product_id":"1"');
                    expect(count).toEqual(6);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should return an array with one order where the user id = 1 and the status of the order is closed", function () { return __awaiter(void 0, void 0, void 0, function () {
        var Orders, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Orders = new order_1.OrderStore();
                    return [4 /*yield*/, Orders.completedOrdersByUser(1)];
                case 1:
                    result = _a.sent();
                    expect(JSON.stringify(result)).toEqual('[{"id":1,"status":"closed","user_id":"1"}]');
                    return [2 /*return*/];
            }
        });
    }); });
});
