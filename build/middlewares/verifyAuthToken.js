"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * @description Checks if the JWT is valid and has not been tampered with
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
function verifyAuthToken(req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        var token = authorizationHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        res.status(401).json("Cannot perform operation: Invalid credentials");
    }
}
exports.default = verifyAuthToken;
