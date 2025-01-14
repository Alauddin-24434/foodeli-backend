"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModel = void 0;
const mongoose_1 = require("mongoose");
// Create the Mongoose schema for the payment
const paymentSchema = new mongoose_1.Schema({
    transactionId: { type: String, required: true, }, // Unique identifier for the transaction
    orderId: { type: mongoose_1.Schema.Types.ObjectId, required: true }, // ID of the associated order
    amount: { type: Number, required: true }, // Total amount for the payment
    customerId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'UserModel', required: true }, // Reference to User model
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'cancelled'],
        required: true
    }, // Status of the payment
    createdAt: { type: Date, default: Date.now }, // Date when the payment was cre
    updatedAt: { type: Date, default: Date.now }, // Date when the payment was last updated
});
// Update the updatedAt field before each save
paymentSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
// Create and export the Payment model
exports.PaymentModel = (0, mongoose_1.model)('Payment', paymentSchema);
