"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const order_model_1 = require("./order.model");
const payment_utils_1 = require("../Payment/payment.utils");
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../../errors/appError"));
const payment_model_1 = require("../Payment/payment.model");
const OrderItemIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // Calculate total prices for each item and total amount for the order
        const calculatedItems = payload.items.map(item => {
            const totalPrice = item.price * item.quantity;
            return Object.assign(Object.assign({}, item), { totalPrice // Add total price for the item
             });
        });
        const totalAmount = calculatedItems.reduce((total, item) => total + item.totalPrice, 0);
        // Create the order with the calculated items
        const order = new order_model_1.OrderModel(Object.assign(Object.assign({}, payload), { items: calculatedItems, amount: totalAmount }));
        // Save the order within the transaction
        const savedOrder = yield order.save({ session });
        // Prepare payment data
        const paymentData = {
            transactionId: "trans_" + savedOrder._id,
            orderId: savedOrder._id,
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
            orderId: savedOrder._id,
        };
        const initiatePaymentResponse = yield (0, payment_utils_1.initiatePayment)(initiatePaymentData.transactionId, initiatePaymentData.name, initiatePaymentData.email, initiatePaymentData.phone, initiatePaymentData.address, initiatePaymentData.amount, initiatePaymentData.orderId, paymentData.customerId);
        if (!initiatePaymentResponse) {
            throw new appError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Payment initiation failed");
        }
        // Create the payment
        const payment = new payment_model_1.PaymentModel(paymentData);
        // Save the payment within the transaction
        yield payment.save({ session });
        // Commit the transaction if everything is successful
        yield session.commitTransaction();
        session.endSession();
        console.log("order", savedOrder);
        return initiatePaymentResponse; // Return payment initiation response
    }
    catch (error) {
        // Roll back the transaction if there's an error
        yield session.abortTransaction();
        session.endSession();
        console.error('Transaction aborted due to error:', error);
        throw new appError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Could not save order and payment to database.");
    }
});
// গ্রাহক আইডি দ্বারা অর্ডার খোঁজার ফাংশন
const findOrderByCustomerId = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    // ট্রিম করে গ্রাহক আইডির বৈধতা যাচাই করুন
    const trimmedId = customerId.trim();
    if (!mongoose_1.default.isValidObjectId(trimmedId)) {
        throw new Error("Invalid customer ID format");
    }
    try {
        // গ্রাহকের আইডি অনুযায়ী অর্ডার খুঁজুন
        const orders = yield order_model_1.OrderModel.find({ customerId: trimmedId }).exec();
        return orders; // পাওয়া অর্ডারগুলির তালিকা ফেরত দিন
    }
    catch (error) {
        throw new Error("Error fetching orders: " + error.message);
    }
});
exports.orderService = {
    OrderItemIntoDB,
    findOrderByCustomerId
};
