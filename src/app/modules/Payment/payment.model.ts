import { model, Schema,  } from "mongoose";
import { IPayment } from "./payment.interface";


// Create the Mongoose schema for the payment
const paymentSchema = new Schema<IPayment>({
    transactionId: { type: String, required: true, }, // Unique identifier for the transaction
    orderId: { type: Schema.Types.ObjectId , required: true }, // ID of the associated order
    amount: { type: Number, required: true }, // Total amount for the payment
    customerId: { type: Schema.Types.ObjectId, ref: 'UserModel', required: true }, // Reference to User model
    paymentStatus: { 
        type: String, 
        enum: ['pending', 'completed', 'failed','cancelled'], 
        required: true 
    }, // Status of the payment
    createdAt: { type: Date, default: Date.now }, // Date when the payment was cre
    updatedAt: { type: Date, default: Date.now }, // Date when the payment was last updated

});

// Update the updatedAt field before each save
paymentSchema.pre<IPayment>('save', function(next) {
    this.updatedAt = new Date();
    next();
});

// Create and export the Payment model
export const PaymentModel = model<IPayment>('Payment', paymentSchema);
