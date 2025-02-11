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
exports.orderController = void 0;
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const catchAsync_1 = require("../../middleware/catchAsync");
const order_service_1 = require("./order.service");
const craeteOrderItem = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    console.log(body);
    const result = yield order_service_1.orderService.OrderItemIntoDB(body);
    // Send a success response with the fetched food items
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Order accept sucessfully!",
        success: true,
        data: result,
    });
}));
const findOrdersByCustomerId = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerId } = req.params; // রিকোয়েস্ট প্যারামিটার থেকে গ্রাহক আইডি নিন
    const orders = yield order_service_1.orderService.findOrderByCustomerId(customerId); // অর্ডার খুঁজুন
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Orders retrieved successfully",
        success: true,
        data: orders,
    });
}));
exports.orderController = {
    craeteOrderItem,
    findOrdersByCustomerId,
};
