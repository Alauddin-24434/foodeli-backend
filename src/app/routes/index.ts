import { Router } from "express";
import { authRoutes } from "../modules/Auth/auth.routes";
import { userRoutes } from "../modules/User/user.routes";
import { foodItemRoutes } from "../modules/FoodItem/foodItem.routes";
import { OrderItemRoutes } from "../modules/Order/order.routes";
import { PaymentRoutes } from "../modules/Payment/payment.routes";



const router = Router();

// Define route configurations in an array
const routes = [
    { path: "/", route: authRoutes },
    { path: "/", route: userRoutes },
    { path: "/", route: foodItemRoutes },
    { path: "/", route: OrderItemRoutes },
    { path: "/", route: PaymentRoutes },
];

// Use Array.map to register each route
routes.map(({ path, route }) => router.use(path, route));

export default router;
