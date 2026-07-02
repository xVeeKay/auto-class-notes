import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const modelChoices = ["gemini-2.5-flash-lite", "gemini-2.5-flash"];
export const geminiProvider = async (imageBuffer, mimeType, PROMPT) => {
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        generationConfig: {
            responseMimeType: "application/json",
        },
    });
    const imagePart = {
        inlineData: {
            data: imageBuffer.toString("base64"),
            mimeType,
        },
    };
    const result = await model.generateContent([imagePart, PROMPT]);
    return result.response.text();
};
