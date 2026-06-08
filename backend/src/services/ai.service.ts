import fs from "fs"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI=new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
  },
});

const PROMPT = `
You are an expert academic assistant helping college students study from lecture slides and classroom photos.

Analyze the uploaded image carefully.

Your tasks:

1. Detect the academic subject.
Examples:
- DBMS
- Operating Systems
- Computer Networks
- OOPS
- Data Structures
- Mathematics

2. Detect the exact topic.

3. Generate easy-to-understand notes.

IMPORTANT:
- Write in student-friendly language.
- Focus on exam-important concepts.
- Keep notes concise but meaningful.
- Explain difficult concepts simply.
- Do NOT copy raw slide text directly.
- Organize neatly.

Return ONLY valid JSON.

JSON FORMAT:
{
  "subject": "",
  "topic": "",
  "notes": ""
}
`;

const fileToGenerativePart=(buffer:Buffer,mimeType:string)=>{
    return{
        inlineData:{
            data:buffer.toString("base64"),
            mimeType
        }
    }
}

export const analyzeLectureImage=async(buffer:Buffer,mimeType:string)=>{
    const imagePart=fileToGenerativePart(buffer,mimeType)
    const result= await model.generateContent([PROMPT,imagePart])

    const response=result.response.text()
    return response
}