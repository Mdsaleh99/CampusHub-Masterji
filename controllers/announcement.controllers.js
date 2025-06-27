import { db } from "../db/db.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

export const createAnnouncement = asyncHandler(async (req, res, next) => {
    const {title, message} = req.validateBody
    const userId = req.user.id

    const user = await db.user.findUnique({
        where: {
            id: userId
        }
    })

    if (user.role === "STUDENT") {
        return next(new ApiError(401, "You don't have access to create announcement"))
    }

    const announcement = await db.announcement.create({
        data: {
            title,
            message,
            createdBy: userId
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    })

    if (!announcement) {
        return next(new ApiError(403, "announcement creation failed"))
    }

    return res.status(201).json(new ApiResponse(201, announcement, "Announcement is created successfully"))

})

export const getAllAnnouncement = asyncHandler(async (req, res, next) => {
    const allAnnouncement = await db.announcement.findMany({})
    if (!allAnnouncement || allAnnouncement.length === 0) {
        return next(new ApiError(404, "No announcement found"))
    }

    return res.status(200).json(new ApiResponse(200, allAnnouncement, "All announcement fetched successfully"))
})