import express from "express"
import { authMiddleware, authroizedRoles } from "../middlewares/auth.middlewares"

const router = express.Router()

router.post("/create", authMiddleware, authroizedRoles("ADMIN", "FACULTY"));

export default router