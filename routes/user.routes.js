import express from "express"
import { getMe, signin, signout, signup } from "../controllers/user.controllers.js"
import { signinSchema, signupSchema } from "../validators/index.js"
import { validate } from "../middlewares/validator.middlewares.js"
import { authMiddleware } from "../middlewares/auth.middlewares.js"

const router = express.Router()

router.post("/register", validate(signupSchema), signup)
router.post("/login", validate(signinSchema), signin)
router.post("/logout", signout)
router.post("/me", authMiddleware, getMe)

export default router