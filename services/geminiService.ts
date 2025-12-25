
import { GoogleGenerativeAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export const getHealthAdvice = async (playerData: any, query: string) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `You are an elite sports performance AI. Based on this player data: ${JSON.stringify(playerData)}, answer this question: ${query}. Be professional, concise, and focused on performance and health.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini Error:", error);
        return "Lo siento, hubo un problema al procesar tu consulta técnica.";
    }
};
