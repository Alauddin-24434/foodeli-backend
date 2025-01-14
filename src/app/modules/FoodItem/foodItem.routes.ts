import { Router } from "express";
import { foodItemController } from "./foodItem.controller";


const router = Router();

// Route for creating a new food item
// It accepts a POST request to '/foodItem-create' with uploaded images
router.post('/foodItem-create', foodItemController.createFoodItem);

// Route for adding a review to a specific food item
// It accepts a POST request to '/foodItem/:id/review'
router.post("/foodItem/:id/review", foodItemController.addReview);

// Route for fetching all food items
// It accepts a GET request to '/foodItems'
router.get("/foodItems", foodItemController.findAllFoodItems);

// Route for fetching a specific food item by its ID
// It accepts a GET request to '/foodItem/:id'
router.get("/foodItem/:id", foodItemController.findFoodItemById);

// Route for updating a specific food item by its ID
// It accepts a PUT request to '/foodItem/:id'
router.put("/foodItem/:id", foodItemController.updateFoodItem);

// Route for deleting a specific food item by its ID
// It accepts a DELETE request to '/foodItem/:id'
router.delete("/foodItem/:id", foodItemController.deleteFoodItem);

// Exporting the router for use in other parts of the application
export const foodItemRoutes = router;
