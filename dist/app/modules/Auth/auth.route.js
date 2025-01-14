"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const auth_validation_1 = require("../../validations/auth.validation");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
router.post('/register', (0, validateRequest_1.default)(auth_validation_1.registerAuthValidation), auth_controller_1.authController.registerUser);
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.registerAuthLogin), auth_controller_1.authController.loginUser);
exports.authRoutes = router;
