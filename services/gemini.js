import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY is not set. Please check your .env file.");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function generateTitleFromPrompt(messageContent) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ parts: [{ text: messageContent }] }],
      config: {
        systemInstruction:
          "You generate a 'single','concise (8-9 words max)' YouTube video title that accurately reflects the actual content of the video from provided transcript. Do not make it sound exciting or engaging — just make it clear, direct, and informative. No emojis, no options, no vague hooks. The goal is to help viewers understand what the video is about, not to lure them in.",
      },
    });

    const title =
      response.text ||
      response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Unable to parse Gemini response";

    return title.trim();
  } catch (error) {
    console.error("Gemini Error:", error.message);
    return "Error generating title";
  }
}
