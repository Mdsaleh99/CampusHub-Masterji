import express from "express"
import { validate } from "../middlewares/validator.middlewares.js"
import { authMiddleware, authroizedRoles } from "../middlewares/auth.middlewares.js"
import { createStudentResult, getResultByStudentId } from "../controllers/result.controllers.js"

const router = express.Router()

router.post("/", authMiddleware, authroizedRoles("ADMIN"), createStudentResult)
router.get("/:studentId", authMiddleware, getResultByStudentId)

export default router