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
exports.paymentService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const payment_model_1 = require("./payment.model"); // Import your payment model
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../../errors/appError"));
const payment_utils_1 = require("./payment.utils");
const order_model_1 = require("../Order/order.model");
const verifyAndUpdatePaymentStatus = (transactionId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // Validate the transaction ID
        if (!transactionId) {
            throw new appError_1.default(http_status_1.default.BAD_REQUEST, "Transaction ID is required");
        }
        // Retrieve payment details using transaction ID
        const payment = yield payment_model_1.PaymentModel.findOne({ transactionId }).session(session);
        if (!payment) {
            throw new appError_1.default(http_status_1.default.NOT_FOUND, "Payment not found");
        }
        // Retrieve the associated order
        const findOrder = yield order_model_1.OrderModel.findOne({
            _id: payment.orderId,
        }).session(session);
        if (!findOrder) {
            throw new appError_1.default(http_status_1.default.NOT_FOUND, "Order not found");
        }
        // Verify payment status with external payment service
        const paymentVerificationResponse = yield (0, payment_utils_1.verifyPaymentWithAmarPay)(transactionId);
        // Update payment and order status based on verification response
        if ((paymentVerificationResponse === null || paymentVerificationResponse === void 0 ? void 0 : paymentVerificationResponse.pay_status) === "Successful") {
            payment.paymentStatus = "completed";
            findOrder.paymentStatus = "completed";
        }
        else if ((paymentVerificationResponse === null || paymentVerificationResponse === void 0 ? void 0 : paymentVerificationResponse.pay_status) === "Failed") {
            payment.paymentStatus = "failed";
            findOrder.paymentStatus = "failed";
        }
        else {
            throw new appError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Unexpected payment status");
        }
        // Save both payment and order updates within the session
        yield payment.save({ session });
        yield findOrder.save({ session });
        // Commit the transaction
        yield session.commitTransaction();
        return payment;
    }
    catch (error) {
        // Rollback the transaction and handle error
        yield session.abortTransaction();
        console.error("Transaction aborted due to error:", error);
        throw new appError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Transaction failed and has been rolled back.");
    }
    finally {
        // End session regardless of success or error
        session.endSession();
    }
});
const paymnetCancelAndUpdate = (transactionId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // Validate the transaction ID
        if (!transactionId) {
            throw new appError_1.default(http_status_1.default.BAD_REQUEST, "Transaction ID is required");
        }
        // Retrieve payment details using transaction ID
        const payment = yield payment_model_1.PaymentModel.findOne({ transactionId }).session(session);
        // Check if payment exists
        if (!payment) {
            throw new appError_1.default(http_status_1.default.NOT_FOUND, "Payment not found");
        }
        // Retrieve the associated order using orderId from payment
        const findOrder = yield order_model_1.OrderModel.findOne({
            _id: payment.orderId,
        }).session(session);
        // Check if the order exists
        if (!findOrder) {
            throw new appError_1.default(http_status_1.default.NOT_FOUND, "Order not found");
        }
        // Check if the payment is already canceled
        if (payment.paymentStatus === "cancelled") {
            throw new appError_1.default(http_status_1.default.BAD_REQUEST, "Payment is already canceled");
        }
        // Update payment status to 'cancelled'
        payment.paymentStatus = "cancelled";
        // Optionally, update the order status if needed
        findOrder.paymentStatus = "cancelled"; // Example update if required
        // Save updated payment and order information
        yield payment.save({ session });
        yield findOrder.save({ session }); // Save the updated order status if you modify it
        // Commit the transaction
        yield session.commitTransaction();
        session.endSession();
        return payment; // Return updated payment and order information
    }
    catch (error) {
        // Rollback the transaction if there's an error
        yield session.abortTransaction();
        session.endSession();
        console.error("Transaction aborted due to error:", error);
        throw new appError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Transaction failed and has been rolled back.");
    }
});
const paymnetFailedAndUpdate = (transactionId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // Validate the transaction ID
        if (!transactionId) {
            throw new appError_1.default(http_status_1.default.BAD_REQUEST, "Transaction ID is required");
        }
        // Retrieve payment details using transaction ID
        const payment = yield payment_model_1.PaymentModel.findOne({ transactionId }).session(session);
        // Check if payment exists
        if (!payment) {
            throw new appError_1.default(http_status_1.default.NOT_FOUND, "Payment not found");
        }
        // Check if the payment is already failed
        if (payment.paymentStatus === "failed") {
            throw new appError_1.default(http_status_1.default.BAD_REQUEST, "Payment is already failed");
        }
        // Retrieve the associated order using orderId from payment
        const findOrder = yield order_model_1.OrderModel.findOne({
            _id: payment.orderId,
        }).session(session);
        // Check if the order exists
        if (!findOrder) {
            throw new appError_1.default(http_status_1.default.NOT_FOUND, "Order not found");
        }
        // Update payment status to 'failed'
        payment.paymentStatus = "failed";
        // Optionally, update the order status if needed
        findOrder.paymentStatus = "failed"; // Example update if required
        // Save updated payment and order information
        yield payment.save({ session });
        yield findOrder.save({ session }); // Save the updated order status if you modify it
        // Commit the transaction
        yield session.commitTransaction();
        session.endSession();
        return payment; // Return updated payment and order information
    }
    catch (error) {
        // Rollback the transaction if there's an error
        yield session.abortTransaction();
        session.endSession();
        console.error("Transaction aborted due to error:", error);
        throw new appError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Transaction failed and has been rolled back.");
    }
});
// Fetch all payment from the database
const findAllPaymentInDB = (_a) => __awaiter(void 0, [_a], void 0, function* ({ page, limit, search = "", status = "", }) {
    const skip = (page - 1) * limit;
    // Build query object for search and filtering
    const query = {};
    // Apply search condition if provided
    if (search) {
        query.$or = [
            { user: { $regex: search, $options: "i" } },
            { transactionId: { $regex: search, $options: "i" } },
        ];
    }
    // Apply status filter if provided
    if (status) {
        query.status = status;
    }
    // Fetch payments with pagination, search, and filtering
    const payments = yield payment_model_1.PaymentModel.find(query)
        .skip(skip)
        .limit(limit)
        .populate('customerId', 'name email') // Populate userId with selected fields
        .exec();
    // Get total count for the given query (for pagination)
    const total = yield payment_model_1.PaymentModel.countDocuments(query);
    return { payments, total };
});
exports.paymentService = {
    verifyAndUpdatePaymentStatus,
    paymnetCancelAndUpdate,
    paymnetFailedAndUpdate,
    findAllPaymentInDB,
};
