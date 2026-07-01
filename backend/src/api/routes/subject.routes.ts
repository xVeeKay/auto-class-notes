import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getSubjects,createSubject } from "../controllers/subject.controller.js";

const router=Router()


router.get("/",protect,getSubjects)
router.post("/create",protect,createSubject)




export default router