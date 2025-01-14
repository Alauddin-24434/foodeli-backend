import express, { Application, Request, Response } from "express";
import cors from "cors";
import { notFound } from "./app/middleware/notFound";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import cookieParser from "cookie-parser";
import { authenticate } from "./app/middleware/authenticate";
import multer from "multer";

const cloudinary = require("cloudinary").v2;

export const upload = multer();

import router from "./app/routes";
import FoodItemModel from "./app/modules/FoodItem/foodItem.model";

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://foodeli-plum.vercel.app","http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));

cloudinary.config({
  cloud_name: "dzzokyuu0",
  api_key: "122373185126954",
  api_secret: "RJxLjA45D_N67O8yXvIJHwNnQr8",
});

// Basic route
app.get("/", (req: Request, res: Response) => {
  const result = "Hello world";
  res.send(result);
});

// Protected route
app.get("/check", authenticate("user"), (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "User is authenticated!",
    user: req.user,
  });
});
app.get("/food", async (req: Request, res: Response) => {
  try {
    const foodItems = await FoodItemModel.find(); // Fetch all food items from the database
    res.status(200).json({ success: true, data: foodItems });
  } catch (error: any) {
    console.error("Error fetching food items:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

app.use(router);

// Global error handling middleware
app.use(globalErrorHandler);

// Not found middleware
app.use(notFound);

export default app;
