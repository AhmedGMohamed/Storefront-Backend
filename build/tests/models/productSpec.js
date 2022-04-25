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
var product_1 = require("../../models/product");
var insertMockupData_1 = __importDefault(require("../../utils/insertMockupData"));
var resetTables_1 = __importDefault(require("../../utils/resetTables"));
describe("Product model test suite", function () {
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
    it("Should return a resolved promise with an array of products", function () { return __awaiter(void 0, void 0, void 0, function () {
        var Products, result, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    Products = new product_1.ProductStore();
                    _b = (_a = JSON).stringify;
                    return [4 /*yield*/, Products.index()];
                case 1:
                    result = _b.apply(_a, [_c.sent()]);
                    expect(result).toEqual('[{"id":1,"name":"Name1","price":1,"category":"Category1","order_counter":"1"},{"id":2,"name":"Name2","price":2,"category":"Category2","order_counter":"2"}]');
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should return a resolved promise with one product of id 1", function () { return __awaiter(void 0, void 0, void 0, function () {
        var Products, result, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    Products = new product_1.ProductStore();
                    _b = (_a = JSON).stringify;
                    return [4 /*yield*/, Products.show(1)];
                case 1:
                    result = _b.apply(_a, [_c.sent()]);
                    expect(result).toEqual('{"id":1,"name":"Name1","price":1,"category":"Category1","order_counter":"1"}');
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should insert a new product with the specified values", function () { return __awaiter(void 0, void 0, void 0, function () {
        var p, Products, result, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    p = {
                        name: "Name4",
                        price: "3",
                        category: "Category3"
                    };
                    Products = new product_1.ProductStore();
                    _b = (_a = JSON).stringify;
                    return [4 /*yield*/, Products.create(p)];
                case 1:
                    result = _b.apply(_a, [_c.sent()]);
                    expect(result).toEqual('{"id":3,"name":"Name4","price":3,"category":"Category3","order_counter":"0"}');
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should edit the previous product's name into Name3", function () { return __awaiter(void 0, void 0, void 0, function () {
        var p, Products, result, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    p = {
                        id: "3",
                        name: "Name3",
                        price: "3",
                        category: "Category3"
                    };
                    Products = new product_1.ProductStore();
                    _b = (_a = JSON).stringify;
                    return [4 /*yield*/, Products.update(p)];
                case 1:
                    result = _b.apply(_a, [_c.sent()]);
                    expect(result).toEqual('{"id":3,"name":"Name3","price":3,"category":"Category3","order_counter":"0"}');
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should delete the product with id 3", function () { return __awaiter(void 0, void 0, void 0, function () {
        var Products, result, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    Products = new product_1.ProductStore();
                    _b = (_a = JSON).stringify;
                    return [4 /*yield*/, Products.delete(3)];
                case 1:
                    result = _b.apply(_a, [_c.sent()]);
                    expect(result).toEqual('{"id":3,"name":"Name3","price":3,"category":"Category3","order_counter":"0"}');
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should return an array containing one product with the category as Category1", function () { return __awaiter(void 0, void 0, void 0, function () {
        var Products, result, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    Products = new product_1.ProductStore();
                    _b = (_a = JSON).stringify;
                    return [4 /*yield*/, Products.productCategory("Category1")];
                case 1:
                    result = _b.apply(_a, [_c.sent()]);
                    expect(result).toEqual('[{"id":1,"name":"Name1","price":1,"category":"Category1","order_counter":"1"}]');
                    return [2 /*return*/];
            }
        });
    }); });
});
