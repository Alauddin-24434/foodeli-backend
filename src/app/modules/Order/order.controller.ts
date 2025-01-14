import sendResponse from "../../../utils/sendResponse";
import { catchAsync } from "../../middleware/catchAsync";
import { orderService } from "./order.service";

const craeteOrderItem= catchAsync(async (req, res, next) => {

 

const body=req.body;
console.log(body)
const result =await orderService.OrderItemIntoDB(body)

    // Send a success response with the fetched food items
    sendResponse(res, {
        statusCode: 200,
        message: "Order accept sucessfully!",
        success: true,
        data: result,
    });
});
const findOrdersByCustomerId = catchAsync(async (req, res) => {
    const { customerId } = req.params; // রিকোয়েস্ট প্যারামিটার থেকে গ্রাহক আইডি নিন

    const orders = await orderService.findOrderByCustomerId(customerId); // অর্ডার খুঁজুন

    sendResponse(res, {
        statusCode: 200,
        message: "Orders retrieved successfully",
        success: true,
        data: orders,
    });
});


export const orderController={
craeteOrderItem,
findOrdersByCustomerId ,
}