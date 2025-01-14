"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = require("../modules/Auth/auth.routes");
const user_routes_1 = require("../modules/User/user.routes");
const foodItem_routes_1 = require("../modules/FoodItem/foodItem.routes");
const order_routes_1 = require("../modules/Order/order.routes");
const payment_routes_1 = require("../modules/Payment/payment.routes");
const router = (0, express_1.Router)();
// Define route configurations in an array
const routes = [
    { path: "/", route: auth_routes_1.authRoutes },
    { path: "/", route: user_routes_1.userRoutes },
    { path: "/", route: foodItem_routes_1.foodItemRoutes },
    { path: "/", route: order_routes_1.OrderItemRoutes },
    { path: "/", route: payment_routes_1.PaymentRoutes },
];
// Use Array.map to register each route
routes.map(({ path, route }) => router.use(path, route));
exports.default = router;
