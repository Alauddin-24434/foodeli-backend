import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();


// Route to get all users
router.get('/user' , userController.findAllUsers)

// Route to get a user by ID
router.get('/user/:id', userController.findSingleUserById); // GET /user/:id

// Route to update a user by ID
router.put('/user/:id', userController.updateUserById); // PUT /user/:id

// You can add more routes as needed

export const userRoutes = router;
