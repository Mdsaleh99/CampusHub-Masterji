import { asyncHandler } from "../utils/async-handler.js";
import { db } from "../db/db.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";



export const getAllUsers = asyncHandler(async (req, res, next) => {
    const allUsers = await db.user.findMany();

    if (!allUsers || allUsers.length === 0) {
        return next(new ApiError(404, "users not found"));
    }

    return res
        .status(200)
        .json(new ApiResponse(200, allUsers, "All users fetched successfully"));
});


export const updateUserRole = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const { role } = req.body
    
    if (!role) {
        return next(new ApiError(401, "role is required"))
    }
    
    const userRole = await db.user.update({
        where: {
            id
        },
        data: {
            role
        }
    })

    if (!userRole) {
        return next(new ApiError(401, "role updation failed"))
    }

    return res.status(201).json(new ApiResponse(200, userRole, "user role updated successfully"))

})