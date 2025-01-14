
// create user 

import sendResponse from "../../../utils/sendResponse";
import { catchAsync } from "../../middleware/catchAsync";
import { authService } from "./auth.service";

// register user
const registerUser = catchAsync(async (req, res, next) => {
    const data = req.body;
    const { newUser, authResponse } = await authService.registerUserIntoDB(data);
    const {accessToken,refreshToken  } = authResponse.tokens;
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

// login user
const loginUser = catchAsync(async (req, res, next) => {
    console.log("controler")
    const data = req.body;
    console.log(data)
    const { findUser, authResponse } = await authService.userLoginIntoDb(data);
    const {accessToken,refreshToken  } = authResponse.tokens;
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,

    })

    sendResponse(res, {
        statusCode: 200,
        message: "User is  created sucessfully!",
        success: true,
        data: { findUser, accessToken, refreshToken }
    })
});



export const authController = {
    registerUser,
    loginUser
}