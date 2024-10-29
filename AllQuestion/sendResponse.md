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