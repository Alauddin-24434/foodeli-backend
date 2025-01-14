import { Router } from "express";
import { paymentVerifyController } from "./payment.controller";

const router = Router();

router.post(
  "/verify-payment",
  paymentVerifyController.paymentVerifyAndUpdatePayment
);
router.put(
  "/fail-payment",
  paymentVerifyController.paymentFailAndUpdate
);
router.put(
  "/cancel-payment",
  paymentVerifyController.paymentCancelAndUpdate
);

// Route to get all users
router.get('/payment' , paymentVerifyController.findAllPayment)



export const PaymentRoutes = router;
