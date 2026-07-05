import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { createFeedback } from "../controllers/feedback.controller.js";


const router=Router()

router.post("/",protect,createFeedback)

export default router