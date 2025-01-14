import bcrypt from "bcryptjs";

import { createAuthResponse } from "../../../utils/authHelpers";

import { IUser } from "../User/user.interface";
import UserModel from "../User/user.model";





// Register user
const registerUserIntoDB = async (payload: IUser) => {
    const newUser = new UserModel(payload);
    await newUser.save();
    const authResponse= createAuthResponse(newUser);

    return {newUser, authResponse}
};

// Login user
const userLoginIntoDb = async (payload:{email:string, password:string}) => {
    console.log(payload)
    const findUser = await UserModel.findOne({ email: payload.email });
    console.log(findUser)
    if (!findUser) {
        throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(payload.password, findUser.password);
    if (!isPasswordValid) {
        throw new Error("Invalid credentials");
    }

    const authResponse= createAuthResponse(findUser);

    return {findUser, authResponse}
};


export const authService = {
    registerUserIntoDB,
    userLoginIntoDb,
};