"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
// Middleware to log when the /user route is accessed
router.use('/user', (req, res, next) => {
    console.log("hi"); // Log the message
    next(); // Call the next middleware or route handler
});
// Route to get all users
router.get('/user', user_controller_1.userController.findAllUsers); // GET /user/
// Route to get a user by ID
router.get('/user/:id', user_controller_1.userController.findSingleUserById); // GET /user/:id
// Route to update a user by ID
router.put('/user/:id', user_controller_1.userController.updateUserById); // PUT /user/:id
// You can add more routes as needed
exports.userRoutes = router;
