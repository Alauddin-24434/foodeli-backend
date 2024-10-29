# 2. AppError

## Purpose

**বাংলা:**
`AppError` ক্লাসটি একটি কাস্টম ত্রুটি হ্যান্ডলার, যা অ্যাপ্লিকেশন ত্রুটিগুলিকে আরও কার্যকরভাবে পরিচালনা করতে সাহায্য করে। এটি অপারেশনাল ত্রুটি (অর্থাৎ, স্বাভাবিক অ্যাপ্লিকেশন কার্যক্রমের সময় হওয়া প্রত্যাশিত ত্রুটি) এবং প্রোগ্রামিং ত্রুটি (অর্থাৎ, অপ্রত্যাশিত ত্রুটি) এর মধ্যে পার্থক্য করতে সহায়তা করে।

**English:**
The `AppError` class is a custom error handler that helps manage application errors more effectively. It distinguishes between operational errors (i.e., expected errors occurring during normal application operations) and programming errors (i.e., unexpected errors).

## Key Features

- **Error Inheritance:** 
  - Inherits from the built-in `Error` class, allowing it to utilize existing error properties and methods while adding custom functionality.

- **Properties:**
  - `statusCode`: An integer representing the HTTP status code associated with the error (e.g., 404 for Not Found, 500 for Server Error).
  - `isOperational`: An optional boolean property indicating whether the error is operational or a programming error. Set to true in development mode.

- **Constructor:**
  - Accepts `statusCode` and `message` parameters.
  - In development mode, both `statusCode` and `isOperational` are set, facilitating debugging and error management.
  - In production mode, only `statusCode` is set to avoid exposing sensitive information.
  - Captures the stack trace to help identify the source of the error.

## Example Usage

### Class Definition

```typescript
import config from "../app/config/config";

class AppError extends Error {
    statusCode: number;
    isOperational?: boolean; // Optional property

    constructor(statusCode: number, message: string) {
        super(message);
        
        // Set status and isOperational in development mode
        if (config.node_env === "development") {
            this.statusCode = statusCode;
            this.isOperational = true; // Indicates an operational error
        } else {
            // Not exposing these in production mode
            this.statusCode = statusCode;
        }

        // Capture stack trace
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;
