import { geminiProvider } from "./gemini.provider.js";
import { openRouterProvider } from "./openrouter.provider.js";


const buildPrompt = (existingSubjects: string[]) => {
  const subjectsText =
    existingSubjects.length > 0
      ? existingSubjects.map((s) => `- ${s}`).join("\n")
      : "No existing subjects";

  return `
  You are an expert academic revision assistant.

  The student uploads lecture slides/images to create REVISION NOTES, not detailed study notes.

  Existing subjects:

  ${subjectsText}

  IMPORTANT SUBJECT MATCHING:

  - If the uploaded content belongs to an existing subject, ALWAYS use the EXACT subject name from the list.
  - Match based on the overall domain, not individual chapter names.
  - Examples:
    - DBMS → Database Normalization, SQL, Transactions
    - Computer Networks → TCP/IP, Routing, HTTP, DNS
    - Operating Systems → Scheduling, Deadlock, Paging
  - Create a new subject ONLY if none of the existing subjects are suitable.

  YOUR TASKS

  1. Identify the academic subject.
  2. Identify the lecture/topic.
  3. Generate HIGH-QUALITY REVISION NOTES.

  REVISION NOTE RULES

  The notes should help a student revise in 2–5 minutes before an exam.

  • Write SHORT bullet points.
  • Avoid long paragraphs.
  • Every line should contain only ONE important idea.
  • Cover ALL important concepts shown in the lecture.
  • Include definitions only if essential.
  • Include formulas, syntax or commands when applicable.
  • Include important advantages/disadvantages if relevant.
  • Include comparisons as Markdown tables whenever useful.
  • Mention interview-important concepts.
  • Mention exam-important concepts.
  • Do NOT repeat information.
  • Do NOT add unnecessary explanations.
  • Keep notes concise but complete.

  FORMATTING

  Use Markdown.

  - Use headings (##).
  - Use bullet points.
  - Use numbered lists only for sequences.
  - Use tables for comparisons.
  - Use blockquotes for important tips.
  - Highlight ONLY important keywords using <mark>...</mark>.
  - Highlight around 5–10 key terms per page.
  - Never highlight entire sentences.

  STYLE

  Think like a topper making last-minute revision notes.

  Good:
  • Small bullets
  • Easy scanning
  • High information density

  Bad:
  • Long paragraphs
  • Story-like explanations
  • Textbook language
  • Unnecessary filler

  If no educational content exists, return:

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