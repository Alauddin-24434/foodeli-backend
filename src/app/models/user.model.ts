import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";

//  user schema
const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    profileImage: {
        type: String,
        default: null, // Default value for profile image
    },
}, {
    timestamps: true // timestamps যুক্ত করে স্বয়ংক্রিয়ভাবে createdAt এবং updatedAt ফিল্ড তৈরি করা হবে
});


// user model 
const UserModel = model<IUser>('User', userSchema);

export default UserModel;