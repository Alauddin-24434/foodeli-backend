import { Router } from "express";
import { orderController } from "./order.controller";


const router = Router();


// order create
router.post("/order-initiate", orderController.craeteOrderItem);


// Route to get users
router.get('/order/:customerId' , orderController.findOrdersByCustomerId)


// Exporting the router for use in other parts of the application
export const OrderItemRoutes = router;
