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
var user_1 = require("../models/user");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var verifyAuthToken_1 = __importDefault(require("../middlewares/verifyAuthToken"));
var decode_1 = __importDefault(require("../utils/decode"));
var checkPassword_1 = __importDefault(require("../utils/checkPassword"));
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var Users = new user_1.UserStore();
router.get("/", verifyAuthToken_1.default, function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Users.index()];
            case 1:
                response = _a.sent();
                res.json(response);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(400).json("".concat(error_1));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/:id", verifyAuthToken_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, Users.show(id)];
            case 1:
                response = _a.sent();
                res.json(response);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(400).json("".concat(error_2));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var u, response, token, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                u = {
                    email: req.body.email,
                    firstName: req.body.firstname,
                    lastName: req.body.lastname,
                    password: req.body.password
                };
                return [4 /*yield*/, Users.create(u)];
            case 1:
                response = _a.sent();
                token = jsonwebtoken_1.default.sign({ user: response }, process.env.TOKEN_SECRET);
                res.json(token);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(400).json("".concat(error_3));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.put("/:id", verifyAuthToken_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var u, decoded, _a, response, token, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                u = {
                    id: req.params.id,
                    email: req.body.email,
                    firstName: req.body.firstname,
                    lastName: req.body.lastname,
                    password: req.body.password,
                    newPassword: req.body.newpassword
                };
                decoded = (0, decode_1.default)(req.headers.authorization);
                _a = u.id == decoded.user.id;
                if (!_a) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, checkPassword_1.default)(
                    //Checks if the password in the JWT is the correct password for the user with the supplied id
                    decoded.user.id, u.password)];
            case 1:
                _a = (_b.sent());
                _b.label = 2;
            case 2:
                if (!_a) return [3 /*break*/, 4];
                return [4 /*yield*/, Users.update(u)];
            case 3:
                response = _b.sent();
                token = jsonwebtoken_1.default.sign({ user: response }, process.env.TOKEN_SECRET);
                res.json(token);
                return [2 /*return*/];
            case 4:
                res.status(401).json("Invalid Credentials");
                return [3 /*break*/, 6];
            case 5:
                error_4 = _b.sent();
                res.status(400).json("".concat(error_4));
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
router.delete("/:id", verifyAuthToken_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var decoded, password, _a, response, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                decoded = (0, decode_1.default)(req.headers.authorization);
                password = req.body.password;
                _a = decoded.user.id == req.params.id;
                if (!_a) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, checkPassword_1.default)(
                    //Checks if the correct password is supplied in the JWT
                    decoded.user.id, password)];
            case 1:
                _a = (_b.sent());
                _b.label = 2;
            case 2:
                if (!_a) return [3 /*break*/, 4];
                return [4 /*yield*/, Users.delete(req.params.id)];
            case 3:
                response = _b.sent();
                res.json(response);
                return [2 /*return*/];
            case 4:
                res.status(401).json("Invalid Credentials");
                return [3 /*break*/, 6];
            case 5:
                error_5 = _b.sent();
                res.status(400).json("".concat(error_5));
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
router.post("/authenticate/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var u, token, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Users.authenticate(req.params.id, req.body.password)];
            case 1:
                u = _a.sent();
                token = jsonwebtoken_1.default.sign({ user: u }, process.env.TOKEN_SECRET);
                res.json(token);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                res.status(401).json("".concat(error_6));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
