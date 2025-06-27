import { db } from "../db/db.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

export const createStudentResult = asyncHandler(async (req, res, next) => {
    // const { userId, subName, marks, percentage, totalMarks, status, resultId } = req.body
    const {userId, totalMarks, percentage, exams} = req.body // exams is an array of objects

    
    if (!userId) {
        return next(new ApiError(403, "user id is required"))
    }

    const user = await db.user.findUnique({
        where: {
            id: userId
        }
    })

    if (!user) {
        return next(new ApiError(404, "User not found"))
    }

    const result = await db.result.create({
        data: {
            userId,
            totalMarks,
            percentage,
            exams: {
                create: exams
            }
        },
        include: {
            exams: true
        }
    })

    if (!result) {
        return next(new ApiError(403, "Result creation failed"));
    }

    return res.status(201).json(new ApiResponse(200, result, "result created successfully"))

})


export const getResultByStudentId = asyncHandler(async (req, res, next) => {
    const userId = req.user.id
    const { studentId } = req.params
    
    // By writing this controller i understand:
    //  1. first handle unhappy parts and validations
    //  2. second get id first and then make a db call
    //  3. DRY - Don't Repeat Yourself - (i understand this because previously i written setp 2 for each role with some validations)

    let targetStudentId
    if (req.user.role === "STUDENT") {
        if (userId !== studentId) {
            return next(
                new ApiError(403, "Students can only access their own results")
            );
        }
        targetStudentId = studentId;
    } else {
        // Faculty / Admin can access any student result
        targetStudentId = studentId
    }
    
    const result = await db.result.findMany({
        where: {
            userId: targetStudentId
        },
        include: {
            exams: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    role: true,
                    email: true
                }
            }
        }
    })

    if (!result || result.length === 0) {
        return next(new ApiError(404, "Result not found for this user"));
    }

    

    return res
        .status(200)
        .json(new ApiResponse(200, result, "result fetched successfully"));

})