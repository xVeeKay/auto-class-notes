import express from "express"
import cors from "cors"
import helmet from "helmet"
import errorMiddleware from "./api/middlewares/error.middleware.js"
import cookieParser from "cookie-parser"
import authRoutes from "./api/routes/auth.routes.js"
import noteRoutes from "./api/routes/note.routes.js"
import subjectRoutes from "./api/routes/subject.routes.js"
import feedbackRoutes from "./api/routes/feedback.routes.js"

const app=express()

app.use(cors({
  origin: process.env.FRONTEND_URL?.replace(/\/$/, ""),
  credentials: true
}));
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/notes",noteRoutes)
app.use("/api/v1/subjects",subjectRoutes)
app.use("/api/v1/feedback",feedbackRoutes)



app.get("/health",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Server is running"
    })
})
app.get('/error', () => {
  throw new Error('Test error')
})

app.use(errorMiddleware)
export default app
