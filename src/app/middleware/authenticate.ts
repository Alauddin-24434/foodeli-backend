import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../utils/verifyToken";

import { catchAsync } from "./catchAsync";
import AppError from "../../errors/appError";
import UserModel from "../modules/User/user.model";

export const authenticate = (requiredRole: string) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const token = req.headers.authorization;

        if (!token) {
            throw new AppError(401, "Access denied. No token provided.")

        }

        // Verify the token
        const decoded = verifyToken(token);
        const { email, role } = decoded; // Ensure your token payload includes the role

        // Find the user by email
        const user = await UserModel.findOne({ email: email });
        if (!user) {
           
            throw new AppError(404, "This user is not found!")
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
    });
};
