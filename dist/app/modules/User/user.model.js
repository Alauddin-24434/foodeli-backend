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
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
//  user schema
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["superAdmin", "admin", "user"],
        default: "user",
    },
    profileImage: {
        type: String,
        default: null, // Default value for profile image
    },
    userStatus: {
        type: String,
        enum: ["active", "banned"], // Enum values for userStatus
        default: "active", // Default status
    },
}, {
    timestamps: true, // timestamps যুক্ত করে স্বয়ংক্রিয়ভাবে createdAt এবং updatedAt ফিল্ড তৈরি করা হবে
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (!user.isModified("password"))
            return next(); // Only hash if the password is new or modified
        user.password = yield bcryptjs_1.default.hash(user.password, Number(12));
        next();
    });
});
// Exclude password from JSON output
userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password; // Remove password field
    return user;
};
// user model
const UserModel = (0, mongoose_1.model)("User", userSchema);
exports.default = UserModel;
