"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.foodItemController = exports.createFoodItem = void 0;
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse")); // Utility function for sending responses
const catchAsync_1 = require("../../middleware/catchAsync"); // Middleware to handle asynchronous errors
const cloudinary = require("cloudinary").v2;
const foodItem_service_1 = require("./foodItem.service"); // Service for food item operations
// Controller function for creating food item
exports.createFoodItem = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    console.log(req.body);
    // Create food item in DB via service
    try {
        const savedFoodItem = yield foodItem_service_1.foodItemService.createFoodItemIntoDB(body);
        // Send success response
        return (0, sendResponse_1.default)(res, {
            statusCode: 201,
            message: "Food item created successfully!",
            success: true,
            data: savedFoodItem,
        });
    }
    catch (error) {
        return (0, sendResponse_1.default)(res, {
            statusCode: 500,
            message: "Failed to create food item",
            success: false,
            data: error,
        });
    }
}));
// Find all food items with optional filtering and pagination
const findAllFoodItems = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.q; // Search query from request
    const page = parseInt(req.query.page) || 1; // Current page number
    const limit = parseInt(req.query.limit) || 10; // Items per page
    const category = req.query.category; // Category filter
    const sorting = req.query.sorting; // Sorting order
    // Build filter object for querying food items
    const filter = {};
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
    const sortOptions = {};
    if (sorting === "lowToHigh") {
        sortOptions.price = 1; // Sort price in ascending order
    }
    else if (sorting === "highToLow") {
        sortOptions.price = -1; // Sort price in descending order
    }
    const result = yield foodItem_service_1.foodItemService.findAllFoodItemsINtoDB(filter, page, limit, sortOptions); // Fetch food items from DB with filters and sorting
    // Send a success response with the fetched food items
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "FoodItems retrieved successfully!",
        success: true,
        data: result,
    });
}));
// Find a specific food item by its ID
const findFoodItemById = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Extract ID from URL parameters
    const result = yield foodItem_service_1.foodItemService.findFoodItemByIdIntoDB(id); // Fetch food item by ID
    // Send a success response with the fetched food item
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "FoodItem retrieved successfully!",
        success: true,
        data: result,
    });
}));
// Update a specific food item by its ID
const updateFoodItem = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Extract ID from URL parameters
    const updates = req.body; // Extract new data from request body
    const result = yield foodItem_service_1.foodItemService.updateFoodItemIntoDB(id, updates); // Update food item in DB
    // Send a success response with the updated food item
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "FoodItem updated successfully!",
        success: true,
        data: result,
    });
}));
// Delete a specific food item by its ID
const deleteFoodItem = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Extract ID from URL parameters
    const result = yield foodItem_service_1.foodItemService.deleteFoodItemByIdIntoDB(id); // Delete food item from DB
    // Send a success response confirming deletion
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "FoodItem deleted successfully!",
        success: true,
        data: result,
    });
}));
// Add a review to a specific food item
const addReview = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params; // Extract ID from URL parameters
    const review = req.body; // Extract review data from request body
    const updatedFoodItem = yield foodItem_service_1.foodItemService.addReviewService(id, review); // Add review to food item
    console.log("updatedFoodItem", updatedFoodItem); // Log the updated food item
    const lastReview = (_a = updatedFoodItem === null || updatedFoodItem === void 0 ? void 0 : updatedFoodItem.reviews) === null || _a === void 0 ? void 0 : _a[updatedFoodItem.reviews.length - 1]; // Get the last review added
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
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Review added successfully!",
        success: true,
        data: lastReview,
    });
}));
// Exporting the food item controller functions for use in routes
exports.foodItemController = {
    createFoodItem: exports.createFoodItem,
    addReview,
    findFoodItemById,
    findAllFoodItems,
    updateFoodItem,
    deleteFoodItem,
};
