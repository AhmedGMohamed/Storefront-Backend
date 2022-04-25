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
var supertest_1 = __importDefault(require("supertest"));
var index_1 = __importDefault(require("../../index"));
var insertMockupData_1 = __importDefault(require("../../utils/insertMockupData"));
var resetTables_1 = __importDefault(require("../../utils/resetTables"));
var request = (0, supertest_1.default)(index_1.default);
describe("Orders route test suite", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
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
        it("Should respond with a JSON containing an array of orders & HTTP status code 200", function () { return __awaiter(void 0, void 0, void 0, function () {
            var token, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.post("/users").send({
                            email: "random@example.com",
                            firstname: "random",
                            lastname: "name",
                            password: "password"
                        })];
                    case 1:
                        token = (_a.sent()).body.token;
                        return [4 /*yield*/, request
                                .get("/orders")
                                .set("Authorization", "Bearer ".concat(token))];
                    case 2:
                        response = _a.sent();
                        expect(response.statusCode).toEqual(200);
                        expect(JSON.stringify(response.body)).toEqual('[{"id":1,"status":"closed","user_id":"1"},{"id":2,"status":"open","user_id":"2"}]');
                        return [2 /*return*/];
                }
            });
        }); });
        it("Should respond with a JSON containing an order with id 1 & HTTP status code 200 ", function () { return __awaiter(void 0, void 0, void 0, function () {
            var token, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.post("/users").send({
                            email: "random@example.com",
                            firstname: "random",
                            lastname: "name",
                            password: "password"
                        })];
                    case 1:
                        token = (_a.sent()).body.token;
                        return [4 /*yield*/, request
                                .get("/orders/1")
                                .set("Authorization", "Bearer ".concat(token))];
                    case 2:
                        response = _a.sent();
                        expect(response.statusCode).toEqual(200);
                        expect(JSON.stringify(response.body)).toEqual('{"id":1,"status":"closed","user_id":"1"}');
                        return [2 /*return*/];
                }
            });
        }); });
        it("Should create an order and respond with a JSON containing an order with id 3, Status4 & HTTP status code 200 ", function () { return __awaiter(void 0, void 0, void 0, function () {
            var token, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.post("/users").send({
                            email: "random@example.com",
                            firstname: "random",
                            lastname: "name",
                            password: "password"
                        })];
                    case 1:
                        token = (_a.sent()).body.token;
                        return [4 /*yield*/, request
                                .post("/orders")
                                .set("Authorization", "Bearer ".concat(token))
                                .send({ status: "Status4", user_id: "3" })];
                    case 2:
                        response = _a.sent();
                        expect(response.statusCode).toEqual(200);
                        expect(JSON.stringify(response.body)).toEqual('{"id":3,"status":"Status4","user_id":"3"}');
                        return [2 /*return*/];
                }
            });
        }); });
        it("Should edit the order with id 3 and respond with a JSON containing an order with id 3, Status3, & HTTP status code 200", function () { return __awaiter(void 0, void 0, void 0, function () {
            var token, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.post("/users").send({
                            email: "random@example.com",
                            firstname: "random",
                            lastname: "name",
                            password: "password"
                        })];
                    case 1:
                        token = (_a.sent()).body.token;
                        return [4 /*yield*/, request
                                .put("/orders/3")
                                .set("Authorization", "Bearer ".concat(token))
                                .send({ status: "Status3", user_id: "3" })];
                    case 2:
                        response = _a.sent();
                        expect(response.statusCode).toEqual(200);
                        expect(JSON.stringify(response.body)).toEqual('{"id":3,"status":"Status3","user_id":"3"}');
                        return [2 /*return*/];
                }
            });
        }); });
        it("Should delete the order with id 3 and respond with a JSON containing the delted order with an HTTP status code 200", function () { return __awaiter(void 0, void 0, void 0, function () {
            var token, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.post("/users").send({
                            email: "random@example.com",
                            firstname: "random",
                            lastname: "name",
                            password: "password"
                        })];
                    case 1:
                        token = (_a.sent()).body.token;
                        return [4 /*yield*/, request
                                .delete("/orders/3")
                                .set("Authorization", "Bearer ".concat(token))];
                    case 2:
                        response = _a.sent();
                        expect(response.statusCode).toEqual(200);
                        expect(JSON.stringify(response.body)).toEqual('{"id":3,"status":"Status3","user_id":"3"}');
                        return [2 /*return*/];
                }
            });
        }); });
        it("Should add a new item to the order_product table", function () { return __awaiter(void 0, void 0, void 0, function () {
            var token, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.post("/users").send({
                            email: "random@example.com",
                            firstname: "random",
                            lastname: "name",
                            password: "password"
                        })];
                    case 1:
                        token = (_a.sent()).body.token;
                        return [4 /*yield*/, request
                                .post("/orders/product/1")
                                .set("Authorization", "Bearer ".concat(token))
                                .send({ quantity: 5, order_id: "2" })];
                    case 2:
                        response = _a.sent();
                        expect(response.statusCode).toEqual(200);
                        expect(JSON.stringify(response.body)).toContain('"order_id":"2","product_id":"1"');
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
