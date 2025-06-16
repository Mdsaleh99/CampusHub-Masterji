import { db } from "../db/db.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import jwt from "jsonwebtoken"

export const authMiddleware = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return next(new ApiError(401, "Unauthorized - No token provided"));
    }

    let decodedToken
    try {
        decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return next(new ApiError(500, "Unauthorized - Invalid token"))
    }

    const user = await db.user.findUnique({
        where: {
            id: decodedToken.id
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true
        }
    })

    if (!user) {
        return next(new ApiError(404, "user not found"))
    }

    req.user = user
    next()
})

export const authroizedRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ApiError(
                    403,
                    "You do not have permission to access this resource"
                )
            );
        }

        next()
    }
}