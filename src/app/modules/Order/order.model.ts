import { model, Schema } from "mongoose";
import { IOrder, IOrderItem } from "./order.interface";


// OrderItem schema definition
const orderItemSchema = new Schema<IOrderItem>({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
});

// Order schema definition
const orderSchema = new Schema<IOrder>({
    customerId: { type: String, required: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    paymentStatus: { 
        type: String, 
        enum: ['pending', 'completed', 'failed','cancelled'], 
        default:'pending'
    }, // Status of the payment
    items: [orderItemSchema], // Array of items
    address: { type: String, required: true },
    phone: { type: String, required: true },
    amount:{ type: Number, required: true },
});



export const OrderModel = model<IOrder>('Order', orderSchema);

