import { Request, Response } from "express";
import User from "../../models/user.model.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import Note from "../../models/note.model.js";
import Subject from "../../models/subject.model.js";
import Feedback from "../../models/feedback.model.js";


export const createFeedback=asyncHandler(async(req:AuthRequest,res:Response)=>{
    const { category, subject, message } = req.body;

    if (!category || !subject || !message) {
      throw new apiError(400, "All fields are required");
    }

    const userId = req.user?._id;

    if (!userId) {
      throw new apiError(401, "Unauthorized");
    }

    const feedback = await Feedback.create({
      userId,
      category,
      subject,
      message,
    });
    res
      .status(201)
      .json(new apiResponse(true, "Feedback submitted successfully", feedback));

})
