import { z } from "zod";

export const registerSchema = z.object({
    fullName: z.string().min(3, "Full name must be at least 3 characters long."),

    username: z.string().min(3, "Username must be at least 3 characters long."),

    email: z.string().email("Please provide a valid email address."),

    password: z.string().min(8, "Password must be at least 8 characters long.")
});