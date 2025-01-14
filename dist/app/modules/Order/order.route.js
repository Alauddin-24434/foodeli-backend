"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemRoutes = void 0;
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
const router = (0, express_1.Router)();
// order create
router.post("/order-initiate", order_controller_1.orderController.craeteOrderItem);
// Exporting the router for use in other parts of the application
exports.OrderItemRoutes = router;
