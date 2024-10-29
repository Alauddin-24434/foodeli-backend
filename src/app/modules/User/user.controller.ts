
// create user 

import sendResponse from "../../../utils/sendResponse";
import { catchAsync } from "../../middleware/catchAsync";
import { userService } from "./user.service";

const createUser = catchAsync(async (req, res, next) => {
    const data = req.body;
    const { newUser, tokens } = await userService.createUserIntoDB(data);
    const { refreshToken, accessToken } = tokens;
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,

    })

    sendResponse(res, {
        statusCode: 201,
        message: "User is  created sucessfully!",
        success: true,
        data: { newUser, accessToken, refreshToken }
    })
});



export const userController = {
    createUser,
}