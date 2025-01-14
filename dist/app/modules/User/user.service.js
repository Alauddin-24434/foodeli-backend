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
exports.userService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("./user.model"));
// Fetch all users from the database
const findAllUsersInDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.find();
    return users; // Return the list of users
});
// Fetch a single user by ID from the database
const findSingleUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Trim whitespace and check if the ID is a valid ObjectId
    const trimmedId = id.trim();
    if (!mongoose_1.default.isValidObjectId(trimmedId)) {
        throw new Error("Invalid user ID format");
    }
    // Return the found user or null
    return yield user_model_1.default.findById(trimmedId).exec(); // Use exec() for better error handling
});
// Find a single user and update their information
const findSingleUserAndUpdate = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const trimmedId = id.trim();
    if (!mongoose_1.default.isValidObjectId(trimmedId)) {
        throw new Error("Invalid user ID format");
    }
    const updatedUser = yield user_model_1.default.findByIdAndUpdate(trimmedId, updateData, {
        new: true, // Return the updated document
        runValidators: true, // Validate the update against the schema
    });
    if (!updatedUser) {
        throw new Error("User not found"); // Handle the case when the user is not found
    }
    return updatedUser;
});
exports.userService = {
    findAllUsersInDB,
    findSingleUserById,
    findSingleUserAndUpdate,
};
