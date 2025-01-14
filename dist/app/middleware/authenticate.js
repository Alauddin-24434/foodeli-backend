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
exports.authenticate = void 0;
const verifyToken_1 = require("../../utils/verifyToken");
const catchAsync_1 = require("./catchAsync");
const appError_1 = __importDefault(require("../../errors/appError"));
const user_model_1 = __importDefault(require("../modules/User/user.model"));
const authenticate = (requiredRole) => {
    return (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        if (!token) {
            throw new appError_1.default(401, "Access denied. No token provided.");
        }
        // Verify the token
        const decoded = (0, verifyToken_1.verifyToken)(token);
        const { email, role } = decoded; // Ensure your token payload includes the role
        // Find the user by email
        const user = yield user_model_1.default.findOne({ email: email });
        if (!user) {
            throw new appError_1.default(404, "This user is not found!");
        }
        // Check if the user has the required role
        if (role !== requiredRole) {
            res.status(403).json({
                success: false,
                message: 'Access denied. You do not have the required permissions.',
            });
            return; // Avoid further execution
        }
        // Attach the user data to the request object
        req.user = decoded;
        // Call next() to proceed to the next middleware or route handler
        next(); // Proceed if everything is okay
    }));
};
exports.authenticate = authenticate;
