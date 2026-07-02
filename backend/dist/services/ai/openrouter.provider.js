import OpenAI from "openai";
const client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});
export const openRouterProvider = async (imageBuffer, mimeType, PROMPT) => {
    const base64 = imageBuffer.toString("base64");
    const response = await client.chat.completions.create({
        model: "openrouter/free",
        response_format: {
            type: "json_object"
        },
        messages: [
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: PROMPT
                    },
                    {
                        type: "image_url",
                        image_url: {
                            url: `data:${mimeType};base64,${base64}`
                        }
                    }
                ]
            }
        ]
    });
    console.log("Model used:", response.model);
    return response.choices[0]?.message?.content || "";
};
