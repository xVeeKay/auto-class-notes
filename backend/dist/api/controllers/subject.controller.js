import Subject from "../../models/subject.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import apiResponse from "../../utils/apiResponse.js";
export const getSubjects = asyncHandler(async (req, res) => {
    const subjects = await Subject.find({ userId: req.user._id }).sort({ createdAt: -1 }).lean();
    res.status(200).json(new apiResponse(true, "Subjects fetched successfully", subjects));
    return;
});
export const createSubject = asyncHandler(async (req, res) => {
    const { title } = req.body;
    const subject = await Subject.create({
        userId: req.user._id,
        title
    });
    res.status(200).json(new apiResponse(true, "Subject created successfully", { subject }));
});
