import express from "express"
import { authMiddleware, authroizedRoles } from "../middlewares/auth.middlewares.js"
import { validate } from "../middlewares/validator.middlewares.js";
import { createAnnouncementSchema } from "../validators/index.js";
import { createAnnouncement, getAllAnnouncement } from "../controllers/announcement.controllers.js";

const router = express.Router()

router.post("/create", validate(createAnnouncementSchema), authMiddleware, authroizedRoles("ADMIN", "FACULTY"), createAnnouncement);

router.get("/get-all", authMiddleware, authroizedRoles("ADMIN", "FACULTY", "STUDENT"), getAllAnnouncement);



export default router