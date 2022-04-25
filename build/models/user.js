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
exports.UserStore = void 0;
var database_1 = __importDefault(require("../database"));
var hasher_1 = __importDefault(require("../utils/hasher"));
var checkPassword_1 = __importDefault(require("../utils/checkPassword"));
var UserStore = /** @class */ (function () {
    function UserStore() {
    }
    /**
     * @description Returns an array of all users found in the database
     * @returns {Promise<Array<User>>} Promise object containing an array with objects of type User
     **/
    UserStore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT id, email, firstName, lastName, password FROM users";
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                }
            });
        });
    };
    /**
     * @description Creates a product using the supplied data
     * @param {(string | number)} id - the id of the user to retrieve from the database
     * @returns {Promise<User>} Promise object containing an object of type User
     **/
    UserStore.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT id, email, firstName, lastName, password FROM users WHERE id = $1";
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                }
            });
        });
    };
    /**
     * @description Creates a user using the supplied data
     * @param {object} u - Object of type User
     * @returns {Promise<User>} Promise object containing an object of type User
     **/
    UserStore.prototype.create = function (u) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, hash, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "INSERT INTO users (email, firstName, lastName, password) VALUES ($1, $2, $3, $4) RETURNING id, email, firstName, lastName, password";
                        hash = (0, hasher_1.default)(u.password);
                        return [4 /*yield*/, conn.query(sql, [
                                u.email,
                                u.firstName,
                                u.lastName,
                                hash
                            ])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                }
            });
        });
    };
    /**
     * @description Updates a user using the supplied data
     * @param {object} u - Object of type User
     * @returns {Promise<User>} Promise object containing an object of type User
     **/
    UserStore.prototype.update = function (u) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, hash, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "UPDATE users SET email = $1, firstName = $2, lastName = $3, password = $4 WHERE id = $5 RETURNING id, email, firstName, lastName, password";
                        hash = (0, hasher_1.default)(u.newPassword);
                        return [4 /*yield*/, conn.query(sql, [
                                u.email,
                                u.firstName,
                                u.lastName,
                                hash,
                                u.id
                            ])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                }
            });
        });
    };
    /**
     * @description Deletes a user using the supplied data
     * @param {(string | number)} id - The id of the user to be deleted
     * @returns {Promise<User>} Promise object containing an object of type User
     **/
    UserStore.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "DELETE FROM users WHERE id = $1 RETURNING id, email, firstName, lastName, password";
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                }
            });
        });
    };
    /**
     * @description Authenticates a user using the id of the user and the password by checking them against the database
     * @param {(string | number)} id - The id of the user to authenticate
     * @param {string} password - The password of the user to check against
     * @returns {Promise<(User | null)>} Promise object containing an object of type User or null if the user is not authenticated
     **/
    UserStore.prototype.authenticate = function (id, password) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT id, email, firstName, lastName, password FROM users WHERE id = $1";
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        if (!result.rows.length) return [3 /*break*/, 4];
                        user = result.rows[0];
                        return [4 /*yield*/, (0, checkPassword_1.default)(id, password)];
                    case 3:
                        //Checks if the password supplied is the same as the password in the database and returns the user
                        if (_a.sent()) {
                            return [2 /*return*/, user];
                        }
                        _a.label = 4;
                    case 4: 
                    //return null if the password check failed
                    return [2 /*return*/, null];
                    case 5:
                        error_1 = _a.sent();
                        throw new Error("".concat(error_1));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return UserStore;
}());
exports.UserStore = UserStore;
