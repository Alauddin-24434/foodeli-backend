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
exports.foodItemService = void 0;
const appError_1 = __importDefault(require("../../../errors/appError"));
const foodItem_model_1 = __importDefault(require("./foodItem.model"));
// Create a new food item in the database
const createFoodItemIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Create foodData by merging payload with thumbnailImage and additionalImages
    const foodItem = new foodItem_model_1.default(payload); // Create a new FoodItemModel instance
    return yield foodItem.save(); // Save the new food item to the database
});
// Add a review to a specific food item
const addReviewService = (id, review) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const foodItem = yield foodItem_model_1.default.findById(id); // Find food item by ID
    if (!foodItem) {
        throw new appError_1.default(404, "Food item not found!"); // Throw error if food item is not found
    }
    (_a = foodItem.reviews) === null || _a === void 0 ? void 0 : _a.push(review); // Add the review to the food item's reviews
    return yield foodItem.save(); // Save the updated food item with the new review
});
// Find all food items in the database, with optional pagination and sorting
const findAllFoodItemsINtoDB = (filter_1, ...args_1) => __awaiter(void 0, [filter_1, ...args_1], void 0, function* (filter, page = 1, limit = 10, sortOptions = {}) {
    const foodItems = yield foodItem_model_1.default.find(filter) // Find food items based on the filter
        .sort(sortOptions) // Sort based on the sorting options
        .skip((page - 1) * limit) // Skip the documents based on the page number
        .limit(limit); // Limit the number of documents returned
    const totalItems = yield foodItem_model_1.default.countDocuments(filter); // Total items count for pagination
    return { items: foodItems, total: totalItems }; // Return found food items and total count
});
// Find a specific food item by its ID
const findFoodItemByIdIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const foodItem = yield foodItem_model_1.default.findById(id); // Find food item by ID
    if (!foodItem) {
        throw new appError_1.default(404, "Food item not found!"); // Throw error if food item is not found
    }
    return foodItem; // Return the found food item
});
// Update a specific food item by its ID
const updateFoodItemIntoDB = (id, updates) => __awaiter(void 0, void 0, void 0, function* () {
    const foodItem = yield foodItem_model_1.default.findById(id); // Find food item by ID
    // Throw an error if the food item is not found
    if (!foodItem) {
        throw new appError_1.default(404, "Food item not found!");
    }
    // Update the food item with new data
    Object.assign(foodItem, updates); // Use Object.assign to merge updates into the food item
    // Save the updated food item
    return yield foodItem.save();
});
// Delete a food item from the database by its ID
const deleteFoodItemByIdIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const foodItem = yield foodItem_model_1.default.findByIdAndDelete(id); // Find and delete food item by ID
    // Throw an error if the food item is not found
    if (!foodItem) {
        throw new appError_1.default(404, "Food item not found!");
    }
});
// Exporting the food item service functions for use in other parts of the application
exports.foodItemService = {
    createFoodItemIntoDB,
    addReviewService,
    findAllFoodItemsINtoDB,
    findFoodItemByIdIntoDB,
    updateFoodItemIntoDB,
    deleteFoodItemByIdIntoDB
};
