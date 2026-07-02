import User from "../../models/user.model.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { generateToken } from "../../utils/jwt.js";
const cookieOptions = {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000,
};
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new apiError(409, "User already exists");
    }
    const user = await User.create({
        name,
        email,
        password
    });
    const token = generateToken(user._id.toString());
    res
        .cookie('token', token, cookieOptions)
        .status(201)
        .json(new apiResponse(true, 'User registered successfully', {
        user,
    }));
});
export const loginUser = asyncHandler(async (req, res) => {
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
export const logoutUser = asyncHandler(async (_req, res) => {
    res.clearCookie("token");
    res.status(200).json(new apiResponse(true, "Logged Out Successfully", null));
});
