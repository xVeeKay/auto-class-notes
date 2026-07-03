import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  getSubjects,
  createSubject,
  deleteSubject,
} from "../controllers/subject.controller.js";

const router=Router()


router.get("/",protect,getSubjects)
router.post("/create",protect,createSubject)
router.delete("/:subjectId",protect,deleteSubject)




export default router