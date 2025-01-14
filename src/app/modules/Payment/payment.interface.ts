import { Schema } from "mongoose";

// Define the structure for the payment document
export interface IPayment extends Document {
    transactionId: string;
    orderId: Schema.Types.ObjectId;
    amount: number;
    paymentMethod: string;
    paymentStatus: 'pending' | 'completed' | 'failed' | 'cancelled';
    createdAt: Date;
    updatedAt: Date;
    customerId: Schema.Types.ObjectId, 
}
