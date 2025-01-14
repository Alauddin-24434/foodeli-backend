"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../app/config/config"));
const generateTokens = (payload) => {
    const accessToken = jsonwebtoken_1.default.sign(payload, config_1.default.jwt.accessSecret, {
        expiresIn: config_1.default.jwt.accessExpiresIn,
    });
    const refreshToken = jsonwebtoken_1.default.sign(payload, config_1.default.jwt.refreshSecret, {
        expiresIn: config_1.default.jwt.refreshExpiresIn,
    });
    return {
        accessToken,
        refreshToken,
    };
};
exports.generateTokens = generateTokens;
