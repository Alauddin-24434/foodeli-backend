"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../app/config/config"));
// "এই AppError ক্লাসটি আমাদের অ্যাপ্লিকেশনের ত্রুটিগুলিকে পরিচালনা করতে সাহায্য করে এবং ডেভেলপমেন্ট ও প্রোডাকশন পরিবেশে তাদের কার্যকারিতা অনুযায়ী প্রয়োগ করা হয়। এতে স্বয়ংক্রিয়ভাবে HTTP স্ট্যাটাস কোড এবং ত্রুটি বার্তা সেট করা হয়, যা ত্রুটি শনাক্তকরণ এবং ডিবাগিংয়ে সহায়ক।"
class AppError extends Error {
    constructor(statusCode, message) {
        super(message);
        // ডেভেলপমেন্ট মোডে status এবং isOperational সেট করা হচ্ছে
        if (config_1.default.node_env === "development") {
            this.statusCode = statusCode;
            this.isOperational = true; // অপারেশনাল ত্রুটি নির্দেশ করতে
        }
        else {
            // প্রোডাকশন মোডে এগুলি না দেখানোর জন্য
            this.statusCode = statusCode;
        }
        // Stack trace ক্যাপচার করতে
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = AppError;
// ----------------------------------------------
// Hint: For more details about this function and error handling practices,
// visit:docs.md 
// Solve number:3
// ----------------------------------------------
