import apiError from "./apiError.js";
const parseAIResponse = (text) => {
    try {
        const cleaned = text.replace(/```json/g, '').replace(/```/g, "").trim();
        return JSON.parse(cleaned);
    }
    catch (error) {
        throw new apiError(500, "Invalid AI Response");
    }
};
export default parseAIResponse;
