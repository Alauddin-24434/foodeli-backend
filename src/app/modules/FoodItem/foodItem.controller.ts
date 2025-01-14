import sendResponse from "../../../utils/sendResponse"; // Utility function for sending responses
import { catchAsync } from "../../middleware/catchAsync"; // Middleware to handle asynchronous errors
const cloudinary = require("cloudinary").v2;
import { foodItemService } from "./foodItem.service"; // Service for food item operations


// Controller function for creating food item
export const createFoodItem = catchAsync(async (req, res) => {
  const body = req.body;

console.log(req.body)





  // Create food item in DB via service
  try {
    const savedFoodItem = await foodItemService.createFoodItemIntoDB(body);

    // Send success response
    return sendResponse(res, {
      statusCode: 201,
      message: "Food item created successfully!",
      success: true,
      data: savedFoodItem,
    });
  } catch (error) {
    return sendResponse(res, {
      statusCode: 500,
      message: "Failed to create food item",
      success: false,
      data: error,
    });
  }
});
// Find all food items with optional filtering and pagination
const findAllFoodItems = catchAsync(async (req, res, next) => {
  const query = req.query.q as string; // Search query from request
  const page = parseInt(req.query.page as string) || 1; // Current page number
  const limit = parseInt(req.query.limit as string) || 10; // Items per page
  const category = req.query.category as string; // Category filter
  const sorting = req.query.sorting as string; // Sorting order

  // Build filter object for querying food items
  const filter: any = {};

  if (query) {
    // If a search query exists, filter by name or category
    filter.$or = [
      { name: { $regex: query, $options: "i" } }, // Search by name
      { category: { $regex: query, $options: "i" } }, // Search by category
    ];
  }

  if (category) {
    // If a category is specified, add it to the filter
    filter.category = category;
  }

  // Set sorting criteria based on sorting parameter
  const sortOptions: any = {};
  if (sorting === "lowToHigh") {
    sortOptions.price = 1; // Sort price in ascending order
  } else if (sorting === "highToLow") {
    sortOptions.price = -1; // Sort price in descending order
  }

  const result = await foodItemService.findAllFoodItemsINtoDB(
    filter,
    page,
    limit,
    sortOptions
  ); // Fetch food items from DB with filters and sorting

  // Send a success response with the fetched food items
  sendResponse(res, {
    statusCode: 200,
    message: "FoodItems retrieved successfully!",
    success: true,
    data: result,
  });
});

// Find a specific food item by its ID
const findFoodItemById = catchAsync(async (req, res, next) => {
  const { id } = req.params; // Extract ID from URL parameters

  const result = await foodItemService.findFoodItemByIdIntoDB(id); // Fetch food item by ID

  // Send a success response with the fetched food item
  sendResponse(res, {
    statusCode: 200,
    message: "FoodItem retrieved successfully!",
    success: true,
    data: result,
  });
});

// Update a specific food item by its ID
const updateFoodItem = catchAsync(async (req, res, next) => {
  const { id } = req.params; // Extract ID from URL parameters
  const updates = req.body; // Extract new data from request body

  const result = await foodItemService.updateFoodItemIntoDB(id, updates); // Update food item in DB

  // Send a success response with the updated food item
  sendResponse(res, {
    statusCode: 200,
    message: "FoodItem updated successfully!",
    success: true,
    data: result,
  });
});

// Delete a specific food item by its ID
const deleteFoodItem = catchAsync(async (req, res, next) => {
  const { id } = req.params; // Extract ID from URL parameters
  const result = await foodItemService.deleteFoodItemByIdIntoDB(id); // Delete food item from DB

  // Send a success response confirming deletion
  sendResponse(res, {
    statusCode: 200,
    message: "FoodItem deleted successfully!",
    success: true,
    data: result,
  });
});

// Add a review to a specific food item
const addReview = catchAsync(async (req, res, next) => {
  const { id } = req.params; // Extract ID from URL parameters
  const review = req.body; // Extract review data from request body

  const updatedFoodItem = await foodItemService.addReviewService(id, review); // Add review to food item
  console.log("updatedFoodItem", updatedFoodItem); // Log the updated food item

  const lastReview =
    updatedFoodItem?.reviews?.[updatedFoodItem.reviews.length - 1]; // Get the last review added

  // if (lastReview) {
  //     // If a last review exists, create a notification for it
  //     await notificationService.createNotification({
  //         userId: req.body.userId, // User ID from the request body
  //         itemId: new Types.ObjectId(id), // Convert item ID to ObjectId
  //         reviewId: lastReview._id, // Review ID
  //         message: lastReview?.comment as string, // Review comment
  //     });
  // }

  // Send a success response with the last review added
  sendResponse(res, {
    statusCode: 200,
    message: "Review added successfully!",
    success: true,
    data: lastReview,
  });
});

// Exporting the food item controller functions for use in routes
export const foodItemController = {
  createFoodItem,
  addReview,
  findFoodItemById,
  findAllFoodItems,
  updateFoodItem,
  deleteFoodItem,
};
