import mongoose, { ObjectId } from "mongoose";
import { IOrder } from "./order.interface";
import { OrderModel } from "./order.model";

import { initiatePayment } from "../Payment/payment.utils";
import httpStatus from 'http-status';
import AppError from "../../../errors/appError";
import { PaymentModel } from "../Payment/payment.model";

const OrderItemIntoDB = async (payload: IOrder) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Calculate total prices for each item and total amount for the order
        const calculatedItems = payload.items.map(item => {
            const totalPrice = item.price * item.quantity;
            return {
                ...item,
                totalPrice // Add total price for the item
            };
        });
        
        const totalAmount = calculatedItems.reduce((total, item) => total + item.totalPrice, 0);

        // Create the order with the calculated items
        const order = new OrderModel({
            ...payload,
            items: calculatedItems,
            amount: totalAmount,
        });

        // Save the order within the transaction
        const savedOrder = await order.save({ session });

        // Prepare payment data
        const paymentData = {
            transactionId: "trans_" + savedOrder._id,
            orderId: savedOrder._id as ObjectId,
            amount: savedOrder.amount,
            customerId: payload.customerId,
            paymentStatus: "pending",
        };

        const initiatePaymentData = {
            transactionId: paymentData.transactionId,
            name: savedOrder.customerName,
            email: savedOrder.customerEmail,
            phone: savedOrder.phone,
            address: savedOrder.address,
            amount: savedOrder.amount,
            orderId: savedOrder._id as ObjectId,
        };

        const initiatePaymentResponse = await initiatePayment(
            initiatePaymentData.transactionId,
            initiatePaymentData.name,
            initiatePaymentData.email,
            initiatePaymentData.phone,
            initiatePaymentData.address,
            initiatePaymentData.amount,
            initiatePaymentData.orderId,
            paymentData.customerId
        );

        if (!initiatePaymentResponse) {
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Payment initiation failed");
        }

        // Create the payment
        const payment = new PaymentModel(paymentData);
        
        // Save the payment within the transaction
        await payment.save({ session });

        // Commit the transaction if everything is successful
        await session.commitTransaction();
        session.endSession();

        console.log("order",savedOrder)
       
        return initiatePaymentResponse; // Return payment initiation response
    } catch (error) {
        // Roll back the transaction if there's an error
        await session.abortTransaction();
        session.endSession();
        console.error('Transaction aborted due to error:', error);
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Could not save order and payment to database.");
    }
};


// গ্রাহক আইডি দ্বারা অর্ডার খোঁজার ফাংশন
const findOrderByCustomerId = async (customerId: string) => {
    // ট্রিম করে গ্রাহক আইডির বৈধতা যাচাই করুন
    const trimmedId = customerId.trim();

    if (!mongoose.isValidObjectId(trimmedId)) {
        throw new Error("Invalid customer ID format");
    }

    try {
        // গ্রাহকের আইডি অনুযায়ী অর্ডার খুঁজুন
        const orders = await OrderModel.find({ customerId: trimmedId }).exec();
        return orders; // পাওয়া অর্ডারগুলির তালিকা ফেরত দিন
    } catch (error:any) {
        throw new Error("Error fetching orders: " + error.message);
    }
};





export const orderService = {
    OrderItemIntoDB,
    findOrderByCustomerId
};
