"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const express_1 = require("express");
const payment_controller_1 = require("./payment.controller");
const router = (0, express_1.Router)();
router.post("/verify-payment", payment_controller_1.paymentVerifyController.paymentVerifyAndUpdatePayment);
router.put("/fail-payment", payment_controller_1.paymentVerifyController.paymentFailAndUpdate);
router.put("/cancel-payment", payment_controller_1.paymentVerifyController.paymentCancelAndUpdate);
// Route to get all users
router.get('/payment', payment_controller_1.paymentVerifyController.findAllPayment);
exports.PaymentRoutes = router;
