import { NextFunction, Request, RequestHandler, Response } from "express";

// catchAsync is a higher-order function that accepts an asynchronous function
export const catchAsync = (fn: RequestHandler) => {
  // It returns a new function that takes req, res, and next parameters
  return async (req: Request, res: Response, next: NextFunction) => {
    // Calling the input function fn and wrapping it in Promise.resolve()
    // This allows us to handle the promise returned by fn
    Promise.resolve(fn(req, res, next))
      .catch((error) => {
        // If an error occurs during the execution of fn, it is passed to the next middleware
        next(error);
      });
  };
};



// ----------------------------------------------
// Hint: For more details about this function and error handling practices,
// visit:docs.md 
// Solve number:01
// ----------------------------------------------