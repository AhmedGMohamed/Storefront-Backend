"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jwt_decode_1 = __importDefault(require("jwt-decode"));
function decoder(authHeader) {
    var token = authHeader.split(" ")[1];
    var decoded = (0, jwt_decode_1.default)(token);
    return decoded;
}
exports.default = decoder;
