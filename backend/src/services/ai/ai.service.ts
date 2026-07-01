import { geminiProvider } from "./gemini.provider.js";
import { openRouterProvider } from "./openrouter.provider.js";


const buildPrompt=(existingSubjects:string[])=>{
  const subjectsText=existingSubjects.length>0?existingSubjects.map((s)=>`- ${s}`).join("\n"):"No existing subjects"
  return `
You are an expert academic note-making assistant.

Existing subjects of this student:

${subjectsText}

IMPORTANT:

If the uploaded image belongs to one of the existing subjects,
use the EXACT subject name from the list.

Only create a new subject if none of the existing subjects fit.

Tasks:

1. Identify the academic subject.
2. Identify the exact topic.
3. Generate revision-friendly notes.

Rules:
- Use simple student-friendly language.
- Focus on concepts important for exams and interviews.
- Do NOT copy the slide directly.
- Keep notes concise and useful.

If no educational content exists:

{
  "subject":"N/A",
  "topic":"N/A",
  "notes":"No lecture notes detected."
}

Return ONLY valid JSON.

{
  "subject":"",
  "topic":"",
  "notes":""
}
`;
}

export const analyzeLectureImage=async(imageBuffer:Buffer,mimeType:string,existingSubjects:string[])=>{
  try {
    console.log("Using gemini...")
    const PROMPT=buildPrompt(existingSubjects)
    return await geminiProvider(imageBuffer,mimeType,PROMPT)
  } catch (error) {
    const message =
    error instanceof Error
      ? error.message.toLowerCase()
      : "";

      const shouldFallback =
        message.includes("429") ||
        message.includes("quota exceeded") ||
        message.includes("rate limit") ||
        message.includes("503") ||
        message.includes("service unavailable") ||
        message.includes("high demand");

  if (!shouldFallback) {
    throw error;
  }
  const PROMPT = buildPrompt(existingSubjects);
  return await openRouterProvider(imageBuffer, mimeType, PROMPT);
  }
}