import sendResponse from "../../../utils/sendResponse";
import { catchAsync } from "../../middleware/catchAsync";
import { userService } from "./user.service";

// Find all users
const findAllUsers = catchAsync(async (req, res) => {
  const users = await userService.findAllUsersInDB(); // Fetch all users

  sendResponse(res, {
    statusCode: 200,
    message: "Users retrieved successfully",
    success: true,
    data: users,
  });
});

// find single userby id a user by ID

const findSingleUserById = catchAsync(async (req, res) => {
  const { id } = req.params; // Get userId from request params

  const findUser = await userService.findSingleUserById(id);

  sendResponse(res, {
    statusCode: 200,
    message: "User found successfully",
    success: true,
    data: findUser,
  });
});

// Update a user by ID
const updateUserById = catchAsync(async (req, res) => {
  const { id } = req.params; // Get userId from request params
  const userData = req.body; // Get updated user data from request body

  const updatedUser = await userService.findSingleUserAndUpdate(id, userData); // Update user

  sendResponse(res, {
    statusCode: 200,
    message: "User updated successfully",
    success: true,
    data: updatedUser,
  });
});

export const userController = {
  findSingleUserById,
  findAllUsers,
  updateUserById,
};
