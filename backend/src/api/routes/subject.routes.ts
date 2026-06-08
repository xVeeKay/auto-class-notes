import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getSubjects } from "../controllers/subject.controller.js";

const router=Router()


router.get("/",protect,getSubjects)




export default router