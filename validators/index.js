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

export const createAnnouncementSchema = z.object({
    title: z.string("title is required"),
    message: z.string("description is required"),
    // createdBy: z.string("createdBy is required"),
});

export const createStudentResultSchema = z.object({
    totalMarks: z.number("total marks is required"),
    percentage: z.number("percentage is required")
})

export const studentExamSchema = z.object({
    subName: z.string("subject name is required"),
    marks: z.number("marks is required"),
    status: z.string("status is required")
})

export const courseSchema = z.object({
    name: z.string("name is required"),
    description: z.string("description is required"),
    fees: z.number("fees is required")
})

export const materialSchema = z.object({
    title: z.string("title is required"),
    description: z.string("description is required")
})