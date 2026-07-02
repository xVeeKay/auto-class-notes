import { geminiProvider } from "./gemini.provider.js";
import { openRouterProvider } from "./openrouter.provider.js";


const buildPrompt = (existingSubjects: string[]) => {
  const subjectsText =
    existingSubjects.length > 0
      ? existingSubjects.map((s) => `- ${s}`).join("\n")
      : "No existing subjects";

  return `
You are an expert academic note-making assistant.

The student already has these subjects:

${subjectsText}

Your job is to determine the PRIMARY academic subject of the uploaded notes.

VERY IMPORTANT SUBJECT MATCHING RULES

- Match an existing subject ONLY if it is the SAME academic course.
- Do NOT match subjects simply because one is part of another.
- Parent subjects and child subjects are DIFFERENT.

Examples:

Existing: Computer Science
Notes: Computer Networks
→ Subject = Computer Networks

Existing: Computer Science
Notes: DBMS
→ Subject = DBMS

Existing: Computer Science
Notes: Operating Systems
→ Subject = Operating Systems

Existing: Machine Learning
Notes: Neural Networks
→ Subject = Machine Learning

Existing: DBMS
Notes: SQL Joins
→ Subject = DBMS

Existing: Physics
Notes: Newton's Laws
→ Subject = Physics

If an existing subject exactly represents the course of the notes,
return that EXACT subject name.

Otherwise create a NEW subject name.

----------------------------------------

Tasks

1. Determine the academic subject.
2. Determine the lecture topic.
3. Generate clean revision notes.

Notes Guidelines

- Use Markdown.
- Use headings and bullet points.
- Explain concepts instead of copying text.
- Keep the notes concise.
- Highlight important definitions.
- Include exam/interview important points when applicable.
- Use simple student-friendly language.

If no educational content is present, return

{
  "subject": "N/A",
  "topic": "N/A",
  "notes": "No lecture notes detected."
}

Return ONLY valid JSON.

{
  "subject": "",
  "topic": "",
  "notes": ""
}
`;
};

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