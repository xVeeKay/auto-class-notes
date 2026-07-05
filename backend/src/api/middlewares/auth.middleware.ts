import jwt from "jsonwebtoken";
import { Request,Response,NextFunction } from "express";
import User,{IUser} from "../../models/user.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import apiError from "../../utils/apiError.js";


export interface AuthRequest extends Request{
    user?:IUser
}

export const protect=asyncHandler(
    async(req:AuthRequest,_res:Response,next:NextFunction)=>{
        const token=req.cookies?.token
        if(!token){
            throw new apiError(401,"Unauthorized")
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET!) as {userId:string}
        const user=await User.findById(decoded.userId).select("-password")
        if(!user){
            throw new apiError(401,"User not found")
        }
        req.user=user
        next()
    }
)
