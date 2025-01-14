import { Document } from "mongoose";

// We use extends Document in the IUser interface to inherit Mongoose's built-in properties and methods, such as _id, .save(), and .remove(), allowing seamless interaction with MongoDB. This ensures that our user interface has all the necessary functionality of a Mongoose document while maintaining type safety with TypeScript.

// IUser ইন্টারফেসে extends Document ব্যবহার করা হয় যাতে Mongoose এর নির্মিত প্রপার্টি এবং মেথডগুলো, যেমন _id, .save(), এবং .remove(), পেতে পারি, যা MongoDB এর সাথে কার্যকরীভাবে কাজ করতে সাহায্য করে। এটি আমাদের ব্যবহারকারীর ইন্টারফেসকে Mongoose ডকুমেন্টের সমস্ত প্রয়োজনীয় কার্যকারিতা প্রদান করে, সঙ্গে TypeScript এর সাথে টাইপ সেফটি বজায় রাখে।

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "superAdmin" | "admin" | "user";
  profileImage?: string; // Optional field for user profile image
  userStatus: "active" | "banned"; // Possible statuses
  createdAt: Date;
  updatedAt: Date;
}
