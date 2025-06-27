import { db } from "../db/db.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";


export const createCourse = asyncHandler(async (req, res, next) => {
    const { name, description, fees } = req.validateBody
    
    // const existingCourse = await db.course.findMany({
    //     where: {
    //         name
    //     }
    // })

    // if (existingCourse) {
    //     return next(new ApiError(404, "This course already exists"))
    // }

    const course = await db.course.create({
        data: {
            name,
            description,
            fees,
            userId: req.user.id
        }
    })

    if (!course) {
        return next(new ApiError(401, "course creation failed"))
    }

    res.status(201).json(new ApiResponse(201, course, "new course created successfully"))
})

export const getAllCourses = asyncHandler(async (req, res, next) => {
    const allCourses = await db.course.findMany()

    if (!allCourses || allCourses.length === 0) {
        return next(new ApiError(404, "No course found"))
    }

    res.status(200).json(new ApiResponse(200, allCourses, "All courses fetched successfully"))

})

export const createMaterial = asyncHandler(async (req, res, next) => {
    const { title, description } = req.validateBody
    const {courseId} = req.params
    
    const course = await db.course.findUnique({
        where: {
            id: courseId
        }
    })

    if (!course) {
        return next(new ApiError(404, "course not found"));
    }

    const material = await db.material.create({
        data: {
            courseId,
            title,
            description,
            userId: req.user.id
        },
    });

    if (!material) {
        return next(new ApiError(401, "material creation failed"));
    }

    res.status(201).json(
        new ApiResponse(201, material, "new material created successfully")
    );

})

export const getMaterialByCourseId = asyncHandler(async (req, res, next) => {
    const { courseId } = req.params
    const material = await db.course.findMany({
        where: {
            id: courseId
        },
        include: {
            material: true
        }
    })

    if (!material) {
        return next(new ApiError(401, "material fetching failed"));
    }

    res.status(200).json(
        new ApiResponse(200, material, "material fetched successfully")
    );
})