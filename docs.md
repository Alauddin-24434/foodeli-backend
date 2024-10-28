# API Utility Functions Documentation

## Table of Contents
1. [catchAsync Function](#01catchasync-function)
   - [Purpose](#purpose)
   - [How It Works](#how-it-works)
   - [Example Usage](#example-usage)
2. [sendResponse Function](#02sendresponse-function)
   - [Purpose](#purpose-1)
   - [How It Works](#how-it-works-1)
   - [Example Usage](#example-usage-1)
3. [Conclusion](#conclusion)

---

# 01. catchAsync Function

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



# 2.sendResponse Function

## Purpose
The `sendResponse` function is designed to standardize the format of API responses in an Express application. It ensures consistency across responses, making it easier for developers to understand and handle API responses.

**উদ্দেশ্য:** `sendResponse` ফাংশনটি একটি Express অ্যাপ্লিকেশনে API প্রতিক্রিয়াগুলোর ফরম্যাটকে স্ট্যান্ডার্ডাইজ করার জন্য ডিজাইন করা হয়েছে। এটি প্রতিক্রিয়াগুলোর মধ্যে সামঞ্জস্য নিশ্চিত করে, যা ডেভেলপারদের জন্য API প্রতিক্রিয়াগুলি বোঝা এবং পরিচালনা করা সহজ করে তোলে।

## How It Works
- **Generic Type**: The function utilizes a generic type `T` to allow for flexibility in the type of data returned in the response. This means you can use this function for various types of data without losing type safety.
  - **জেনেরিক টাইপ:** ফাংশনটি একটি জেনেরিক টাইপ `T` ব্যবহার করে যাতে প্রতিক্রিয়াতে ফেরত দেওয়া ডেটার প্রকারের ক্ষেত্রে নমনীয়তা থাকে। এর মানে হল, আপনি ডেটার বিভিন্ন ধরনের জন্য এই ফাংশনটি ব্যবহার করতে পারেন টাইপ নিরাপত্তা হারানো ছাড়াই।

- **Response Structure**: The response is structured as follows:
  - `statusCode`: The HTTP status code (e.g., 200 for success, 404 for not found).
  - `success`: A boolean indicating whether the operation was successful.
  - `message`: An optional message providing additional information about the response.
  - `data`: The actual data returned by the API.

## Example Usage
```typescript


