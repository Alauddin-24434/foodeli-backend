import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { registerAuthLogin, registerAuthValidation } from "../../validations/auth.validation";
import { authController } from "./auth.controller";

const router= Router();


router.post('/register', validateRequest(registerAuthValidation), authController.registerUser );
router.post('/login',  validateRequest(registerAuthLogin) , authController.loginUser )


export const authRoutes= router;