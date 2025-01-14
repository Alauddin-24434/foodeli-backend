import AppError from "../../../errors/appError";
import { IFoodItem } from "./foodItem.interface";
import FoodItemModel from "./foodItem.model";


// Create a new food item in the database
const createFoodItemIntoDB = async (
payload: IFoodItem
)=> {
    // Create foodData by merging payload with thumbnailImage and additionalImages
   

    const foodItem = new FoodItemModel(payload); // Create a new FoodItemModel instance
    return await foodItem.save(); // Save the new food item to the database
};

// Add a review to a specific food item
const addReviewService = async (id: string, review: any) => {
    const foodItem = await FoodItemModel.findById(id); // Find food item by ID
    
    if (!foodItem) {
        throw new AppError(404, "Food item not found!"); // Throw error if food item is not found
    }

    foodItem.reviews?.push(review); // Add the review to the food item's reviews
    return await foodItem.save(); // Save the updated food item with the new review
};


// Find all food items in the database, with optional pagination and sorting
const findAllFoodItemsINtoDB = async (filter: any, page: number = 1, limit: number = 10, sortOptions: any = {}) => {
    const foodItems = await FoodItemModel.find(filter) // Find food items based on the filter
        .sort(sortOptions) // Sort based on the sorting options
        .skip((page - 1) * limit) // Skip the documents based on the page number
        .limit(limit); // Limit the number of documents returned
    
    const totalItems = await FoodItemModel.countDocuments(filter); // Total items count for pagination

    return { items: foodItems, total: totalItems }; // Return found food items and total count
};

// Find a specific food item by its ID
const findFoodItemByIdIntoDB = async (id: string) => {
    const foodItem = await FoodItemModel.findById(id); // Find food item by ID
    
    if (!foodItem) {
        throw new AppError(404, "Food item not found!"); // Throw error if food item is not found
    }

    return foodItem; // Return the found food item
};

// Update a specific food item by its ID
const updateFoodItemIntoDB = async (id: string, updates: any) => {
    const foodItem = await FoodItemModel.findById(id); // Find food item by ID
    
    // Throw an error if the food item is not found
    if (!foodItem) {
        throw new AppError(404, "Food item not found!");
    }

    // Update the food item with new data
    Object.assign(foodItem, updates); // Use Object.assign to merge updates into the food item

    // Save the updated food item
    return await foodItem.save();
};

// Delete a food item from the database by its ID
const deleteFoodItemByIdIntoDB = async (id: string): Promise<void> => {
    const foodItem = await FoodItemModel.findByIdAndDelete(id); // Find and delete food item by ID
    
    // Throw an error if the food item is not found
    if (!foodItem) {
        throw new AppError(404, "Food item not found!");
    }
};

// Exporting the food item service functions for use in other parts of the application
export const foodItemService = {
    createFoodItemIntoDB,
    addReviewService,
    findAllFoodItemsINtoDB,
    findFoodItemByIdIntoDB,
    updateFoodItemIntoDB,
    deleteFoodItemByIdIntoDB
};
