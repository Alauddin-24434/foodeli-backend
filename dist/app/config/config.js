"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
const config = {
    port: parseInt(process.env.PORT, 10) || 5000,
    db_url: process.env.DB_URL,
    jwt: {
        accessSecret: process.env.JWT_ACCESS_SECRET,
        accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
        refreshSecret: process.env.JWT_REFRESH_SECRET,
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    },
    aamarpay: {
        storeId: process.env.STORE_ID,
        signatureKey: process.env.SIGNATURE_KEY,
        paymentUrl: process.env.PAYMENT_URL,
        paymentVerifyUrl: process.env.PAYMENT_VERIFY_URL,
    },
};
exports.default = config;
