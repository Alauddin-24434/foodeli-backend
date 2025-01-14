"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = require("mongoose");
// OrderItem schema definition
const orderItemSchema = new mongoose_1.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
});
// Order schema definition
const orderSchema = new mongoose_1.Schema({
    customerId: { type: String, required: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'cancelled'],
        default: 'pending'
    }, // Status of the payment
    items: [orderItemSchema], // Array of items
    address: { type: String, required: true },
    phone: { type: String, required: true },
    amount: { type: Number, required: true },
});
exports.OrderModel = (0, mongoose_1.model)('Order', orderSchema);
