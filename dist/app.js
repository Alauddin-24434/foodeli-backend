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
exports.upload = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const notFound_1 = require("./app/middleware/notFound");
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authenticate_1 = require("./app/middleware/authenticate");
const multer_1 = __importDefault(require("multer"));
const cloudinary = require("cloudinary").v2;
exports.upload = (0, multer_1.default)();
const routes_1 = __importDefault(require("./app/routes"));
const foodItem_model_1 = __importDefault(require("./app/modules/FoodItem/foodItem.model"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: ["https://foodeli-plum.vercel.app", "http://localhost:5173"],
    credentials: true,
}));
app.use(express_1.default.urlencoded({ extended: true }));
cloudinary.config({
    cloud_name: "dzzokyuu0",
    api_key: "122373185126954",
    api_secret: "RJxLjA45D_N67O8yXvIJHwNnQr8",
});
// Basic route
app.get("/", (req, res) => {
    const result = "Hello world";
    res.send(result);
});
// Protected route
app.get("/check", (0, authenticate_1.authenticate)("user"), (req, res) => {
    res.status(200).json({
        success: true,
        message: "User is authenticated!",
        user: req.user,
    });
});
app.get("/food", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foodItems = yield foodItem_model_1.default.find(); // Fetch all food items from the database
        res.status(200).json({ success: true, data: foodItems });
    }
    catch (error) {
        console.error("Error fetching food items:", error);
        res
            .status(500)
            .json({ success: false, message: "Server error", error: error.message });
    }
}));
app.use(routes_1.default);
// Global error handling middleware
app.use(globalErrorHandler_1.default);
// Not found middleware
app.use(notFound_1.notFound);
exports.default = app;
