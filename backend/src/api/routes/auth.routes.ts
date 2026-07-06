import { Router } from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  fetchUser,
  editUser,
  changePassword,
  deleteAccount,
  forgotPassword,
  resetPassword,
  googleLogin,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { registerSchema,loginSchema } from "../validators/auth.validator.js";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import { Response } from "express";

const router=Router()

router.post("/register",validate(registerSchema),registerUser)
router.post("/login",validate(loginSchema),loginUser)
router.get("/me",protect,fetchUser)
router.patch("/profile",protect,editUser)
router.patch("/password",protect,changePassword)
router.delete("/account",protect,deleteAccount)
router.post("/logout", protect, logoutUser);
router.post("/forgot-password",forgotPassword)
router.post("/reset-password/:token", resetPassword);
router.post("/google",googleLogin)

export default router