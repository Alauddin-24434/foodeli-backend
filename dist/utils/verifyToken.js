"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../app/config/config"));
/**
 * Verifies a JWT token with a given secret.
 *
 * @param {string} token - The JWT token to verify.
 * @param {boolean} isRefreshToken - Indicates if this is a refresh token.
 * @returns {JwtPayload} - The decoded token payload if valid.
 * @throws {Error} - Throws an authorization error if the token is invalid or expired.
 */
const verifyToken = (token, isRefreshToken = false) => {
    try {
        // Choose the correct secret based on the token type
        const secret = isRefreshToken ? config_1.default.jwt.refreshSecret : config_1.default.jwt.accessSecret;
        // Verify the token using the appropriate secret
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        return decoded;
    }
    catch (error) {
        // Throw an error if token verification fails
        throw new Error("You are not authorized!");
    }
};
exports.verifyToken = verifyToken;
