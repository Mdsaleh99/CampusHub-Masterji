import express from "express"
import { authMiddleware, authroizedRoles } from "../middlewares/auth.middlewares.js"
import { getAllUsers, updateUserRole } from "../controllers/admin.controllers.js"

const router = express.Router()

router.get("/users", authMiddleware, authroizedRoles("ADMIN"), getAllUsers)
router.put("/users/:id/role", authMiddleware, authroizedRoles("ADMIN"), updateUserRole)

export default router