import express from "express"
import { authMiddleware, authroizedRoles } from "../middlewares/auth.middlewares.js"
import { createCourse, createMaterial, getAllCourses, getMaterialByCourseId } from "../controllers/course.controllers.js"
import { validate } from "../middlewares/validator.middlewares.js"
import { courseSchema, materialSchema } from "../validators/index.js"

const router = express.Router()

router.post("/add", validate(courseSchema), authMiddleware, authroizedRoles("ADMIN"), createCourse)

router.get("/get-all", authMiddleware, getAllCourses)

router.post("/:courseId/material", validate(materialSchema), authMiddleware, authroizedRoles("FACULTY"), createMaterial)

router.get(
    "/:courseId/materials",
    authMiddleware,
    authroizedRoles("FACULTY", "STUDENT"),
    getMaterialByCourseId
);

export default router