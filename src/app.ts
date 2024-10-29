import express, { Application, Request, Response } from "express";
import cors from 'cors';
import { notFound } from "./app/middleware/notFound";
import { userRoutes } from "./app/modules/User/user.route";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import cookieParser from "cookie-parser";
import { authenticate } from "./app/middleware/authenticate";


const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
}));

app.get('/', (req: Request, res: Response) => {
    const result = "Hello world";
    res.send(result);
});

// Protected route
app.get('/check', authenticate("user"), (req: Request, res: Response) => {
    // At this point, if the user is authenticated, req.user should contain the decoded token payload
    res.status(200).json({
        success: true,
        message: 'User is authenticated!',
        user: req.user, // This will contain the decoded token payload
    });
});

// Use user routes
app.use(userRoutes);

// Global error handling middleware
app.use(globalErrorHandler);

// Not found middleware
app.use(notFound);

export default app;
