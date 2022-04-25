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
var user_1 = require("../../models/user");
var insertMockupData_1 = __importDefault(require("../../utils/insertMockupData"));
var resetTables_1 = __importDefault(require("../../utils/resetTables"));
describe("User model test suite", function () {
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
    it("Should get a list of all users", function () { return __awaiter(void 0, void 0, void 0, function () {
        var Users, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Users = new user_1.UserStore();
                    return [4 /*yield*/, Users.index()];
                case 1:
                    result = _a.sent();
                    expect(result[0]).toBeTruthy();
                    expect(result[1]).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should get the user with id 2", function () { return __awaiter(void 0, void 0, void 0, function () {
        var Users, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Users = new user_1.UserStore();
                    return [4 /*yield*/, Users.show("2")];
                case 1:
                    result = _a.sent();
                    expect(JSON.stringify(result)).toContain('"id":2');
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should create a new user and hash the password supplied", function () { return __awaiter(void 0, void 0, void 0, function () {
        var Users, user, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Users = new user_1.UserStore();
                    user = {
                        email: "userTest1@example.com",
                        firstName: "First Name Test1",
                        lastName: "Last Name Test1",
                        password: "password"
                    };
                    return [4 /*yield*/, Users.create(user)];
                case 1:
                    result = _a.sent();
                    expect(JSON.stringify(result)).toContain('"firstname":"First Name Test1"');
                    expect(JSON.stringify(result.password)).toContain("$2b$");
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should update the user with id 2 and hash the password", function () { return __awaiter(void 0, void 0, void 0, function () {
        var Users, user, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Users = new user_1.UserStore();
                    user = {
                        id: "2",
                        email: "userTest2@example.com",
                        firstName: "First Name Test2",
                        lastName: "Last Name Test2",
                        password: "password",
                        newPassword: "newpassword"
                    };
                    return [4 /*yield*/, Users.update(user)];
                case 1:
                    result = _a.sent();
                    expect(JSON.stringify(result)).toContain('"firstname":"First Name Test2"');
                    expect(JSON.stringify(result.password)).toContain("$2b$");
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should delete the user with id 3", function () { return __awaiter(void 0, void 0, void 0, function () {
        var Users, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Users = new user_1.UserStore();
                    return [4 /*yield*/, Users.delete("3")];
                case 1:
                    result = _a.sent();
                    expect(JSON.stringify(result)).toContain('"id":3');
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should authenticate the supplied user and return the user data", function () { return __awaiter(void 0, void 0, void 0, function () {
        var Users, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Users = new user_1.UserStore();
                    return [4 /*yield*/, Users.authenticate("2", "newpassword")];
                case 1:
                    result = _a.sent();
                    expect(JSON.stringify(result)).toContain('"id":2,"email":"userTest2@example.com"');
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should return null when the wrong user password is given", function () { return __awaiter(void 0, void 0, void 0, function () {
        var Users, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Users = new user_1.UserStore();
                    return [4 /*yield*/, Users.authenticate("2", "randomPassword")];
                case 1:
                    result = _a.sent();
                    expect(result).toBe(null);
                    return [2 /*return*/];
            }
        });
    }); });
});
