

// craete user

import { profile } from "console";
import { generateTokens } from "../../../utils/generateTokens";
import { IUser } from "../../interfaces/user.interface";
import UserModel from "../../models/user.model";

const createUserIntoDB = async (payload: IUser) => {
    const newUser = new UserModel(payload);
    await newUser.save(); // Save the user to the database
    const jwtPayload={
        _id:newUser._id,
        name:newUser.name,
        email:newUser.email,
        profileImage:newUser.profileImage,
        role:newUser.role,
        
    }
    const tokens= generateTokens(jwtPayload)
    return {newUser, tokens}
};


export const userService={
    createUserIntoDB
}