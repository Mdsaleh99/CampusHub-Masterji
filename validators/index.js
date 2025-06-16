import { z } from "zod"

export const signupSchema = z.object({
    email: z.string("email is requrired").email("Invalid email address"),
    name: z.string("name is required"),
    password: z.string("password is required")
})

export const signinSchema = z.object({
    email: z.string("email is requrired").email("Invalid email address"),
    password: z.string("password is required"),
});