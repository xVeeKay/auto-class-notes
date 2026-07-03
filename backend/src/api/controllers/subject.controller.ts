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

export const createSubject=asyncHandler(async(req:AuthRequest,res:Response)=>{
    const {title}=req.body
    const subject=await Subject.create({
        userId:req.user!._id,
        title
    })
    res.status(200).json(
        new apiResponse(true,"Subject created successfully",{subject})
    )
})

export const deleteSubject=asyncHandler(async(req:AuthRequest,res:Response)=>{
    const {subjectId}=req.params
    const subject=await Subject.findOne({_id:subjectId,userId:req.user!._id})
    if(!subject){
        throw new apiError(404,"Subject not found")
    }
    await Note.deleteMany({subjectId:subject._id})
    await subject.deleteOne()
    res.json(new apiResponse(true,"Subject deleted successfully"))
})