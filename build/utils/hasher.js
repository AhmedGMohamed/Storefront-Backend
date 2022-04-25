"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = __importDefault(require("bcrypt"));
var pepper = process.env.BCRYPT_PASSWORD;
var saltRounds = process.env.SALTROUNDS;
/**
 * @description Encrypts and hashes the password supplied using bcrypt
 * @param {string} password - The passwort to encrypt using bcrypt
 * @returns {string} The encrypted(hashed) password
 */
function hash(password) {
    var hashedPassword = bcrypt_1.default.hashSync(password + pepper, parseInt(saltRounds));
    return hashedPassword;
}
exports.default = hash;
