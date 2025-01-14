import { z } from "zod";

// Define the user validation schema using Zod
export const registerAuthValidation= z.object({
    body: z.object({
        name: z.string()
            .min(1, "Name is required") // Name must be a non-empty string
            .regex(/^[a-zA-Z\s]*$/, "Name must be string and contain only letters and spaces"),
        email: z.string().email("Invalid email format"),
        password: z.string().min(6, "Password must be at least 6 characters long"),
        role: z.enum(['admin', 'user']).optional(),
        profileImage: z.string().optional().nullable(),
    }),
});



// login validation

export const registerAuthLogin= z.object({
    body:z.object({
        email:z.string().email("Invalid email format"),
        password:z.string().min(6,"Password must be at least 6 characters long")
    })
});
