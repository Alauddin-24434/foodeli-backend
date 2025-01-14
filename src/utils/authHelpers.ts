// src/utils/authHelpers.ts
import { IUser } from "../app/modules/User/user.interface";
import { generateTokens } from "./generateTokens"; // Adjust path if needed


export const createAuthResponse = (user: IUser) => {
    const jwtPayload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role,
    };
    const tokens = generateTokens(jwtPayload);
    return { user, tokens };
};
