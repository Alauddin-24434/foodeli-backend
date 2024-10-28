import { z } from "zod";

// Define the user validation schema using Zod
export const userSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Name is required"), // Name must be a non-empty string
        email: z.string().email("Invalid email format"), // Must be a valid email format
        password: z.string().min(6, "Password must be at least 6 characters long"), // Password must be at least 6 characters
        role: z.enum(['admin', 'user']).optional(), // Role can be either 'admin' or 'user', it's optional
        profileImage: z.string().optional().nullable(), // Profile image is optional and can be null
    }),
});
