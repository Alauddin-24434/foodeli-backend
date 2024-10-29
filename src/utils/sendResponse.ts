import { Response } from "express";

// Define a generic type for the response structure
type TResponse<T> = {
  statusCode: number;  // The HTTP status code to indicate the result of the request
  success: boolean;     // Indicates whether the operation was successful
  message?: string;     // An optional message providing additional information
  data: T;             // The data to be returned in the response, typed as T
};

/**
 * Creates a standardized format for API responses.
 * @param res - The Express Response object to send the response.
 * @param response - The response data, structured as TResponse<T>.
 */
const sendResponse = <T>(res: Response, response: TResponse<T>) => {
  res.status(response.statusCode).json({
    success: response.success,  // Include the success field in the response
    message: response.message,    // Include the message if provided
    data: response.data,          // Include the actual data in the response
  });
};

export default sendResponse;




// ----------------------------------------------
// Hint: For more details about this function and error handling practices,
// visit:docs.md 
// Solve number:2
// ----------------------------------------------