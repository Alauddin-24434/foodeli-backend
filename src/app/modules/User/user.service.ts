import mongoose from "mongoose";
import { IUser } from "./user.interface";
import UserModel from "./user.model";

// Fetch all users from the database
const findAllUsersInDB = async (): Promise<IUser[]> => {
  const users = await UserModel.find();
  return users; // Return the list of users
};

// Fetch a single user by ID from the database
const findSingleUserById = async (id: string): Promise<IUser | null> => {
  // Trim whitespace and check if the ID is a valid ObjectId
  const trimmedId = id.trim();

  if (!mongoose.isValidObjectId(trimmedId)) {
    throw new Error("Invalid user ID format");
  }

  // Return the found user or null
  return await UserModel.findById(trimmedId).exec(); // Use exec() for better error handling
};

// Find a single user and update their information
const findSingleUserAndUpdate = async (
  id: string,
  updateData: Partial<IUser>
): Promise<IUser | null> => {
  const trimmedId = id.trim();

  if (!mongoose.isValidObjectId(trimmedId)) {
    throw new Error("Invalid user ID format");
  }

  const updatedUser = await UserModel.findByIdAndUpdate(trimmedId, updateData, {
    new: true, // Return the updated document
    runValidators: true, // Validate the update against the schema
  });

  if (!updatedUser) {
    throw new Error("User not found"); // Handle the case when the user is not found
  }

  return updatedUser;
};
export const userService = {
  findAllUsersInDB,
  findSingleUserById,
  findSingleUserAndUpdate,
};
