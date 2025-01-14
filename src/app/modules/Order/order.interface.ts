import { Document } from "mongoose";

 export interface IOrderItem {
    _id: string; // Product unique ID
    name: string; // Product name
    quantity: number; // Quantity of the product
    price: number; // Price per unit of the product
}

// Define the structure for the order
export interface IOrder extends Document {
    customerId: string;
    customerName: string;
    customerEmail: string;
    items: IOrderItem[];
    paymentStatus: 'pending' | 'completed' | 'failed' | 'cancelled';
    address: string;
    phone: string;
    amount: number; // Calculated total amount for all items in the order
}
