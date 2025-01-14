"use strict";
// create user 
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const catchAsync_1 = require("../../middleware/catchAsync");
const auth_service_1 = require("./auth.service");
// register user
const registerUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { newUser, authResponse } = yield auth_service_1.authService.registerUserIntoDB(data);
    const { accessToken, refreshToken } = authResponse.tokens;
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        message: "User is  created sucessfully!",
        success: true,
        data: { newUser, accessToken, refreshToken }
    });
}));
// login user
const loginUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("controler");
    const data = req.body;
    console.log(data);
    const { findUser, authResponse } = yield auth_service_1.authService.userLoginIntoDb(data);
    const { accessToken, refreshToken } = authResponse.tokens;
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "User is  created sucessfully!",
        success: true,
        data: { findUser, accessToken, refreshToken }
    });
}));
exports.authController = {
    registerUser,
    loginUser
};
