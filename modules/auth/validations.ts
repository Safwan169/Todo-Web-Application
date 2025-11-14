import { z } from "zod";

export const signupSchema = z.object({
  first_name: z
    .string()
    .min(2, "Please enter a valid name format.")
    .regex(/^[A-Za-z\s]+$/, "Please enter a valid name format."),
  last_name: z
    .string()
    .min(2, "Please enter a valid name format.")
    .regex(/^[A-Za-z\s]+$/, "Please enter a valid name format."),
  email: z.string().email("Please enter a valid email."),
  password: z.string().min(4, "4 characters minimum."),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match.",
});


export type SignupSchema = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

export type LoginSchema = z.infer<typeof loginSchema>;