import { Router } from "express";
import { loginUser,registerUser,logoutUser } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { registerSchema,loginSchema } from "../validators/auth.validator.js";

const router=Router()

router.post("/register",validate(registerSchema),registerUser)
router.post("/login",validate(loginSchema),loginUser)

export default router