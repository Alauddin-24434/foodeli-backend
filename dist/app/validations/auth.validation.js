"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAuthLogin = exports.registerAuthValidation = void 0;
const zod_1 = require("zod");
// Define the user validation schema using Zod
exports.registerAuthValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string()
            .min(1, "Name is required") // Name must be a non-empty string
            .regex(/^[a-zA-Z\s]*$/, "Name must be string and contain only letters and spaces"),
        email: zod_1.z.string().email("Invalid email format"),
        password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
        role: zod_1.z.enum(['admin', 'user']).optional(),
        profileImage: zod_1.z.string().optional().nullable(),
    }),
});
// login validation
exports.registerAuthLogin = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email("Invalid email format"),
        password: zod_1.z.string().min(6, "Password must be at least 6 characters long")
    })
});
