import { model, Schema } from "mongoose";

import bcrypt from "bcryptjs";
import { IUser } from "./user.interface";

//  user schema
const userSchema = new Schema<IUser>(
  {
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
  },
  {
    timestamps: true, // timestamps যুক্ত করে স্বয়ংক্রিয়ভাবে createdAt এবং updatedAt ফিল্ড তৈরি করা হবে
  }
);

userSchema.pre("save", async function (next) {
  const user = this as IUser;

  if (!user.isModified("password")) return next(); // Only hash if the password is new or modified

  user.password = await bcrypt.hash(user.password, Number(12));
  next();
});

// Exclude password from JSON output
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password; // Remove password field
  return user;
};

// user model
const UserModel = model<IUser>("User", userSchema);

export default UserModel;
