"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jwt_decode_1 = __importDefault(require("jwt-decode"));
/**
 * @description Splits the authorization header, decodes the token and returns the token payload
 * @param {string} authHeader - The authorization header to be decoded
 * @returns {Promise<TokenPayload>} Promise object containing an object of type TokenPayload
 */
function decoder(authHeader) {
    var token = authHeader.split(" ")[1];
    var decoded = (0, jwt_decode_1.default)(token);
    return decoded;
}
exports.default = decoder;
