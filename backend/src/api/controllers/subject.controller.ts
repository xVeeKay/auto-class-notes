import Subject from "../../models/subject.model.js";
import User from "../../models/user.model.js";
import Note from "../../models/note.model.js";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import asyncHandler from "../../utils/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";
import { Response } from "express";



export const getSubjects=asyncHandler(
    async(req:AuthRequest,res:Response)=>{
        const subjects=await Subject.find({userId:req.user!._id}).sort({createdAt:-1}).lean()
        res.status(200).json(
            new apiResponse(true,"Subjects fetched successfully",subjects)
        )
        return
    }
)