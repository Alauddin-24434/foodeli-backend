"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foodItemRoutes = void 0;
const express_1 = require("express");
const foodItem_controller_1 = require("./foodItem.controller");
const storage_1 = require("../../../utils/storage");
const router = (0, express_1.Router)();
// Route for creating a new food item
// It accepts a POST request to '/foodItem-create' with uploaded images
router.post('/foodItem-create', storage_1.upload.fields([{ name: "thumbnailImage" }, { name: "additionalImages" }]), foodItem_controller_1.foodItemController.createFoodItem);
// Route for adding a review to a specific food item
// It accepts a POST request to '/foodItem/:id/review'
router.post("/foodItem/:id/review", foodItem_controller_1.foodItemController.addReview);
// Route for fetching all food items
// It accepts a GET request to '/foodItems'
router.get("/foodItems", foodItem_controller_1.foodItemController.findAllFoodItems);
// Route for fetching a specific food item by its ID
// It accepts a GET request to '/foodItem/:id'
router.get("/foodItem/:id", foodItem_controller_1.foodItemController.findFoodItemById);
// Route for updating a specific food item by its ID
// It accepts a PUT request to '/foodItem/:id'
router.put("/foodItem/:id", foodItem_controller_1.foodItemController.updateFoodItem);
// Route for deleting a specific food item by its ID
// It accepts a DELETE request to '/foodItem/:id'
router.delete("/foodItem/:id", foodItem_controller_1.foodItemController.deleteFoodItem);
// Exporting the router for use in other parts of the application
exports.foodItemRoutes = router;
