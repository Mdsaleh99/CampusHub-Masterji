import express from "express"
import { generateApiKey, getMe, signin, signout, signup } from "../controllers/user.controllers.js"
import { signinSchema, signupSchema } from "../validators/index.js"
import { validate } from "../middlewares/validator.middlewares.js"
import { authMiddleware } from "../middlewares/auth.middlewares.js"

const router = express.Router()

router.post("/register", validate(signupSchema), signup)
router.post("/login", validate(signinSchema), signin)
router.post("/logout", signout)
router.get("/me", authMiddleware, getMe)
router.post("/api-key", authMiddleware, generateApiKey);

export default router