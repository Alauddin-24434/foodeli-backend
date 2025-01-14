"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Creates a standardized format for API responses.
 * @param res - The Express Response object to send the response.
 * @param response - The response data, structured as TResponse<T>.
 */
const sendResponse = (res, response) => {
    res.status(response.statusCode).json({
        success: response.success, // Include the success field in the response
        message: response.message, // Include the message if provided
        data: response.data, // Include the actual data in the response
    });
};
exports.default = sendResponse;
// ----------------------------------------------
// Hint: For more details about this function and error handling practices,
// visit:docs.md 
// Solve number:2
// ----------------------------------------------
