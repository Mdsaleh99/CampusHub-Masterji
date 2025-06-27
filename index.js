import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"


import userRoutes from "./routes/user.routes.js"
import announcementRoutes from "./routes/announcement.routes.js"
import resultRoutes from "./routes/result.routes.js"
import courseRoutes from "./routes/course.routes.js"
import adminRoutes from "./routes/admin.routes.js"
import { globalErrorHandler } from "./middlewares/global_error_handler.middlewares.js"

const app = express()
dotenv.config();

const PORT = process.env.PORT || 8090


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}))


app.use("/api/v1/auth", userRoutes)
app.use("/api/v1/announcements", announcementRoutes);
app.use("/api/v1/results", resultRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/admin", adminRoutes);



app.get("/", (req, res) => {
    return res.send({message: "Backend is running"})
})


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})

app.use(globalErrorHandler);