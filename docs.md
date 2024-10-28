# 01.catchAsync Function

## Purpose
The `catchAsync` function is designed to handle errors in asynchronous Express route handlers. It helps to avoid repetitive try-catch blocks and centralizes error handling.

**উদ্দেশ্য:** `catchAsync` ফাংশনটি অ্যাসিঙ্ক্রোনাস Express রুট হ্যান্ডলারগুলোর মধ্যে এরর হ্যান্ডলিং সহজ করার জন্য তৈরি হয়েছে। এটি পুনরাবৃত্তি `try-catch` ব্লকগুলি এড়াতে এবং এরর হ্যান্ডলিংকে কেন্দ্রীভূত করে।

## How It Works
- **Higher-Order Function**: It takes an asynchronous function as an argument and returns a new function.
  - **হাই অর্ডার ফাংশন:** এটি একটি অ্যাসিঙ্ক্রোনাস ফাংশনকে আর্গুমেন্ট হিসেবে গ্রহণ করে এবং একটি নতুন ফাংশন রিটার্ন করে।

- **Promise Handling**: It uses `Promise.resolve()` to handle any errors thrown in the asynchronous function.
  - **প্রমিজ হ্যান্ডলিং:** এটি `Promise.resolve()` ব্যবহার করে অ্যাসিঙ্ক্রোনাস ফাংশনে ঘটানো যেকোনো এরর হ্যান্ডল করতে।

- **Error Propagation**: If an error occurs, it calls `next(error)` to pass the error to the next middleware.
  - **এরর প্রপাগেশন:** যদি কোন এরর ঘটে, এটি `next(error)` কল করে পরবর্তী মিডলওয়্যারে এররটি পাঠায়।

## Example Usage
```javascript
import { NextFunction, Request, RequestHandler, Response } from "express";

// catchAsync একটি হাই অর্ডার ফাংশন যা একটি অ্যাসিঙ্ক্রোনাস ফাংশন গ্রহণ করে
export const catchAsync = (fn: RequestHandler) => {
  // এটি একটি নতুন ফাংশন রিটার্ন করে যা req, res, এবং next প্যারামিটার গ্রহণ করে
  return async (req: Request, res: Response, next: NextFunction) => {
    // ইনপুট ফাংশন fn কল করা হচ্ছে এবং Promise.resolve() দ্বারা ঘিরে রাখা হচ্ছে
    Promise.resolve(fn(req, res, next))
      .catch((error) => {
        // fn ফাংশনের কার্যক্রমের সময় যদি কোন এরর ঘটে, সেটি পরবর্তী মিডলওয়্যারে পাঠানো হচ্ছে
        next(error);
      });
  };
};
