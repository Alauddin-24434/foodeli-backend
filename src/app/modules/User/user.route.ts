import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { userValidation } from "../../validations/user.validation";
import { userController } from "./user.controller";


const router= Router();


router.post('/create-user', validateRequest(userValidation), userController.createUser );


export const userRoutes= router;