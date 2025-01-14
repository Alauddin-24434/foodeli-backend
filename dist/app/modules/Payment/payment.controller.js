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
exports.paymentVerifyController = void 0;
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const catchAsync_1 = require("../../middleware/catchAsync");
const payment_service_1 = require("./payment.service");
const paymentVerifyAndUpdatePayment = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionId } = req.query;
    console.log("Received transactionId:", transactionId);
    const result = yield payment_service_1.paymentService.verifyAndUpdatePaymentStatus(transactionId);
    try {
        if ((result === null || result === void 0 ? void 0 : result.paymentStatus) === "completed") {
            res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Payment Success</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f0f4f8;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }
                .container {
                    background-color: white;
                    border-radius: 15px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    padding: 30px;
                    text-align: center;
                    max-width: 400px;
                    width: 90%;
                }
                .success-icon {
                    font-size: 50px;
                    color: #4CAF50;
                    margin-bottom: 20px;
                }
                .success-title {
                    font-size: 24px;
                    font-weight: bold;
                    color: #333;
                    margin-bottom: 10px;
                }
                .order-details {
                    background-color: #f9f9f9;
                    border-radius: 8px;
                    padding: 15px;
                    margin: 20px 0;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }
                .order-number-label {
                    font-size: 14px;
                    color: #666;
                }
                .order-number {
                    font-size: 18px;
                    font-weight: bold;
                    color: #333;
                }
                .order-footer {
                    margin-top: 20px;
                }
                .order-footer a {
                    text-decoration: none;
                    color: white;
                    background-color: #4CAF50;
                    padding: 10px 15px;
                    border-radius: 5px;
                    transition: background-color 0.3s;
                }
                .order-footer a:hover {
                    background-color: #45a049;
                }
                @media (max-width: 480px) {
                    .container {
                        padding: 20px;
                    }
                    .success-title {
                        font-size: 20px;
                    }
                    .order-number {
                        font-size: 16px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="success-icon">&#10004;</div>
                <div class="success-title">Congratulations! Payment Complete</div>
                <div class="order-details">
                    <div class="order-number-label">Transaction Number</div>
                    <div class="order-number">${transactionId}</div>
                </div>
                <div class="order-footer">
                    <a href="http://localhost:5173">Go to Homepage</a>
                </div>
            </div>
        </body>
        </html>`);
        }
    }
    catch (error) {
        console.error("Error processing payment verification:", error);
        res.status(500).send("Internal Server Error");
    }
}));
const paymentCancelAndUpdate = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionId } = req.query;
    console.log("Received transactionId:", transactionId);
    const result = yield payment_service_1.paymentService.paymnetCancelAndUpdate(transactionId);
    console.log("result,", result === null || result === void 0 ? void 0 : result.paymentStatus);
    try {
        if ((result === null || result === void 0 ? void 0 : result.paymentStatus) === "cancelled") {
            res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Cancelled</title>
    <style>
      /* Add your styles here */
    </style>
  </head>
  <body>
    <div class="container">
      <div class="cancel-icon">&#10008;</div>
      <div class="cancel-title">Payment Cancelled</div>
      <div class="order-details">
        <div class="order-number-label">Transaction Number</div>
        <div class="order-number">${transactionId}</div>
      </div>
      <div class="order-footer">
        <a href="http://localhost:5173">Go to Homepage</a>
      </div>
    </div>
  </body>
  </html>
`);
        }
    }
    catch (error) {
        console.error("Error processing payment verification:", error);
        res.status(500).send("Internal Server Error");
    }
}));
const paymentFailAndUpdate = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionId } = req.query;
    console.log("failed:", transactionId);
    const result = yield payment_service_1.paymentService.paymnetFailedAndUpdate(transactionId);
    try {
        if ((result === null || result === void 0 ? void 0 : result.paymentStatus) === "failed") {
            res.send(`<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Failed</title>
    <style>
      /* Add your styles here */
    </style>
  </head>
  <body>
    <div class="container">
      <div class="failed-icon">&#10008;</div>
      <div class="failed-title">Payment Failed</div>
      <div class="order-details">
        <div class="order-number-label">Transaction Number</div>
        <div class="order-number">${transactionId}</div>
      </div>
      <div class="order-footer">
        <a href="http://localhost:5173">Go to Homepage</a>
      </div>
    </div>
  </body>
  </html>`);
        }
    }
    catch (error) {
        console.error("Error processing payment verification:", error);
        res.status(500).send("Internal Server Error");
    }
}));
const findAllPayment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract query parameters with defaults
    const { page = 1, limit = 10, search = "", status = "" } = req.query;
    // Parse page and limit to ensure they are numbers
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    // Fetch payments with the specified parameters
    const { payments, total } = yield payment_service_1.paymentService.findAllPaymentInDB({
        page: parsedPage,
        limit: parsedLimit,
        search: search,
        status: status,
    });
    // Send the response with status code and success message
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Payments retrieved successfully",
        success: true,
        data: { payments, total }, // `result` includes `data` and `total`
    });
}));
exports.paymentVerifyController = {
    paymentVerifyAndUpdatePayment,
    paymentCancelAndUpdate,
    paymentFailAndUpdate,
    findAllPayment
};
