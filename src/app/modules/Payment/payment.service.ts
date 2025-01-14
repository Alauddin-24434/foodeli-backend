import mongoose from "mongoose";
import { PaymentModel } from "./payment.model"; // Import your payment model
import httpStatus from "http-status";
import AppError from "../../../errors/appError";
import { verifyPaymentWithAmarPay } from "./payment.utils";
import { OrderModel } from "../Order/order.model";
import { IPayment } from "./payment.interface";

const verifyAndUpdatePaymentStatus = async (transactionId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Validate the transaction ID
    if (!transactionId) {
      throw new AppError(httpStatus.BAD_REQUEST, "Transaction ID is required");
    }

    // Retrieve payment details using transaction ID
    const payment = await PaymentModel.findOne({ transactionId }).session(
      session
    );
    if (!payment) {
      throw new AppError(httpStatus.NOT_FOUND, "Payment not found");
    }

    // Retrieve the associated order
    const findOrder = await OrderModel.findOne({
      _id: payment.orderId,
    }).session(session);
    if (!findOrder) {
      throw new AppError(httpStatus.NOT_FOUND, "Order not found");
    }

    // Verify payment status with external payment service
    const paymentVerificationResponse = await verifyPaymentWithAmarPay(
      transactionId
    );

    // Update payment and order status based on verification response
    if (paymentVerificationResponse?.pay_status === "Successful") {
      payment.paymentStatus = "completed";
      findOrder.paymentStatus = "completed";
    } else if (paymentVerificationResponse?.pay_status === "Failed") {
      payment.paymentStatus = "failed";
      findOrder.paymentStatus = "failed";
    } else {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Unexpected payment status"
      );
    }

    // Save both payment and order updates within the session
    await payment.save({ session });
    await findOrder.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    return payment;
  } catch (error) {
    // Rollback the transaction and handle error
    await session.abortTransaction();
    console.error("Transaction aborted due to error:", error);
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Transaction failed and has been rolled back."
    );
  } finally {
    // End session regardless of success or error
    session.endSession();
  }
};

const paymnetCancelAndUpdate = async (transactionId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Validate the transaction ID
    if (!transactionId) {
      throw new AppError(httpStatus.BAD_REQUEST, "Transaction ID is required");
    }

    // Retrieve payment details using transaction ID
    const payment = await PaymentModel.findOne({ transactionId }).session(
      session
    );

    // Check if payment exists
    if (!payment) {
      throw new AppError(httpStatus.NOT_FOUND, "Payment not found");
    }

    // Retrieve the associated order using orderId from payment
    const findOrder = await OrderModel.findOne({
      _id: payment.orderId,
    }).session(session);

    // Check if the order exists
    if (!findOrder) {
      throw new AppError(httpStatus.NOT_FOUND, "Order not found");
    }

    // Check if the payment is already canceled
    if (payment.paymentStatus === "cancelled") {
      throw new AppError(httpStatus.BAD_REQUEST, "Payment is already canceled");
    }

    // Update payment status to 'cancelled'
    payment.paymentStatus = "cancelled";

    // Optionally, update the order status if needed
    findOrder.paymentStatus = "cancelled"; // Example update if required

    // Save updated payment and order information
    await payment.save({ session });
    await findOrder.save({ session }); // Save the updated order status if you modify it

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return payment; // Return updated payment and order information
  } catch (error) {
    // Rollback the transaction if there's an error
    await session.abortTransaction();
    session.endSession();
    console.error("Transaction aborted due to error:", error);
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Transaction failed and has been rolled back."
    );
  }
};

const paymnetFailedAndUpdate = async (transactionId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Validate the transaction ID
    if (!transactionId) {
      throw new AppError(httpStatus.BAD_REQUEST, "Transaction ID is required");
    }

    // Retrieve payment details using transaction ID
    const payment = await PaymentModel.findOne({ transactionId }).session(
      session
    );

    // Check if payment exists
    if (!payment) {
      throw new AppError(httpStatus.NOT_FOUND, "Payment not found");
    }

    // Check if the payment is already failed
    if (payment.paymentStatus === "failed") {
      throw new AppError(httpStatus.BAD_REQUEST, "Payment is already failed");
    }

    // Retrieve the associated order using orderId from payment
    const findOrder = await OrderModel.findOne({
      _id: payment.orderId,
    }).session(session);

    // Check if the order exists
    if (!findOrder) {
      throw new AppError(httpStatus.NOT_FOUND, "Order not found");
    }

    // Update payment status to 'failed'
    payment.paymentStatus = "failed";

    // Optionally, update the order status if needed
    findOrder.paymentStatus = "failed"; // Example update if required

    // Save updated payment and order information
    await payment.save({ session });
    await findOrder.save({ session }); // Save the updated order status if you modify it

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return payment; // Return updated payment and order information
  } catch (error) {
    // Rollback the transaction if there's an error
    await session.abortTransaction();
    session.endSession();
    console.error("Transaction aborted due to error:", error);
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Transaction failed and has been rolled back."
    );
  }
};

interface FindPaymentsParams {
  page: number;
  limit: number;
  search?: string;
  status?: string;
}

interface PaginatedPaymentsResult {
  payments: IPayment[];
  total: number;
}

// Fetch all payment from the database
const findAllPaymentInDB = async ({
  page,
  limit,
  search = "",
  status = "",
}: FindPaymentsParams): Promise<PaginatedPaymentsResult> => {
  const skip = (page - 1) * limit;

  // Build query object for search and filtering
  const query: Record<string, any> = {};

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
  const payments = await PaymentModel.find(query)
    .skip(skip)
    .limit(limit)
    .populate('customerId', 'name email') // Populate userId with selected fields
    .exec();

  // Get total count for the given query (for pagination)
  const total = await PaymentModel.countDocuments(query);

  return { payments, total };
};

export const paymentService = {
  verifyAndUpdatePaymentStatus,
  paymnetCancelAndUpdate,
  paymnetFailedAndUpdate,
  findAllPaymentInDB,
};
