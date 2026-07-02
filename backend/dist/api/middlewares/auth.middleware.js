import jwt from "jsonwebtoken";
import User from "../../models/user.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import apiError from "../../utils/apiError.js";
export const protect = asyncHandler(async (req, _res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        throw new apiError(401, "Unauthorized");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
        throw new apiError(401, "User not found");
    }
    req.user = user;
    next();
});
