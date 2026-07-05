import { Request, Response } from "express";
import User from "../../models/user.model.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { generateToken } from "../../utils/jwt.js";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import Note from "../../models/note.model.js";
import Subject from "../../models/subject.model.js";

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none" as const,
  maxAge: 24 * 60 * 60 * 1000,
};

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new apiError(409, "User already exists");
    }
    const user = await User.create({
      name,
      email,
      password,
    });
    const token = generateToken(user._id.toString());
    res
      .cookie("token", token, cookieOptions)
      .status(201)
      .json(
        new apiResponse(
          true,

          "User registered successfully",
          {
            user,
          },
        ),
      );
  },
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new apiError(401, "Invalid Credentials");
  }
  const isMatched = await user.comparePassword(password);
  if (!isMatched) {
    throw new apiError(401, "Invalid Credentials");
  }
  const token = generateToken(user._id.toString());
  res
    .cookie("token", token, cookieOptions)
    .status(201)
    .json(new apiResponse(true, "Login Successfull", { user }));
});

export const logoutUser = asyncHandler(async (_req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json(new apiResponse(true, "Logged Out Successfully", null));
});

export const fetchUser = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const notes = await Note.countDocuments({
      userId: req.user?._id,
      status: "completed",
    });
    const subjects = await Subject.countDocuments({ userId: req.user?._id });
    const user = {
      ...req.user!.toObject(),
      stats: {
        notes,
        subjects,
      },
    };

    res
      .status(200)
      .json(new apiResponse(true, "User fetched successfully", { user }));
  },
);

export const editUser = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const name = req.body.name?.trim();
    const email = req.body.email?.trim();
    const user = await User.findById(req!.user!._id);
    if (!user) {
      throw new apiError(404, "User not found");
    }
    if (email) {
      const existingUser = await User.findOne({ email });
      if (
        existingUser &&
        existingUser?._id.toString() !== user?._id.toString()
      ) {
        throw new apiError(409, "Email already exists");
      }
      user.email = email;
    }
    if (name) user.name = name;
    await user?.save();
    const updatedUser = await User.findById(user._id).select("-password");

    res.status(200).json(
      new apiResponse(true, "User updated successfully", {
        user: updatedUser,
      }),
    );
  },
);

export const changePassword = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const currentPassword = req.body.currentPassword?.trim();
    const newPassword = req.body.newPassword?.trim();
    if (!currentPassword || !newPassword) {
      throw new apiError(400, "Current password and new password are required");
    }
    const user = await User.findById(req?.user?._id);
    if (!user) {
      throw new apiError(404, "User not found");
    }
    const isMatched = await user.comparePassword(currentPassword);
    if (!isMatched) {
      throw new apiError(401, "Invalid Password");
    }
    user.password = newPassword;
    await user.save();
    res
      .status(200)
      .json(new apiResponse(true, "Password Changed Successfully"));
  },
);

export const deleteAccount = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user!._id;

    await Subject.deleteMany({ userId });
    await Note.deleteMany({ userId });

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      throw new apiError(404, "User not found");
    }

    res.clearCookie("token");

    res.status(200).json(new apiResponse(true, "Account deleted successfully"));
  },
);