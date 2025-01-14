"use strict";
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
exports.userController = void 0;
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const catchAsync_1 = require("../../middleware/catchAsync");
const user_service_1 = require("./user.service");
// Find all users
const findAllUsers = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_service_1.userService.findAllUsersInDB(); // Fetch all users
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Users retrieved successfully",
        success: true,
        data: users,
    });
}));
// find single userby id a user by ID
const findSingleUserById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Get userId from request params
    const findUser = yield user_service_1.userService.findSingleUserById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "User found successfully",
        success: true,
        data: findUser,
    });
}));
// Update a user by ID
const updateUserById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Get userId from request params
    const userData = req.body; // Get updated user data from request body
    const updatedUser = yield user_service_1.userService.findSingleUserAndUpdate(id, userData); // Update user
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "User updated successfully",
        success: true,
        data: updatedUser,
    });
}));
exports.userController = {
    findSingleUserById,
    findAllUsers,
    updateUserById,
};
