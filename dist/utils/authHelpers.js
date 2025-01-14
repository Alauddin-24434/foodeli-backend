"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthResponse = void 0;
const generateTokens_1 = require("./generateTokens"); // Adjust path if needed
const createAuthResponse = (user) => {
    const jwtPayload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role,
    };
    const tokens = (0, generateTokens_1.generateTokens)(jwtPayload);
    return { user, tokens };
};
exports.createAuthResponse = createAuthResponse;
