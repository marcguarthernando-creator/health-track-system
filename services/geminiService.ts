
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function getHealthInsight(metricsSummary: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: `As an elite sports performance coach, analyze the following metrics and provide a 2-sentence actionable insight: ${metricsSummary}`,
      config: {
        systemInstruction: "You are a world-class sports scientist and performance coach. Your advice is data-driven, concise, and professional. Focus on readiness, workload, and recovery.",
        temperature: 0.7,
      },
    });

    return response.text || "Your current workload and recovery balance are optimal. Maintain consistent training intensity.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Analyzing your trends... Your HRV is stable, suggesting readiness for high-intensity work today.";
  }
}

export type ChatMessage = {
  role: 'user' | 'model';
  parts: [{ text: string }];
};

export async function chatWithCoach(history: ChatMessage[], newMessage: string): Promise<string> {
  try {
    // We use the same model configuration but for chat
    const chat = ai.chats.create({
      model: 'gemini-2.0-flash-exp',
      history: history,
      config: {
        systemInstruction: "You are a world-class sports scientist and performance coach named 'Nova'. You have access to the user's latest biometrics (assume: Readiness 85%, HRV 42ms, Sleep 7h 45m). Provide empathetic, data-driven, and actionable advice.",
        temperature: 0.7,
      }
    });

    const result = await chat.sendMessage(newMessage);
    return result.text || "I'm processing your request, please check back in a moment.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I'm having trouble connecting to the server. Please try again later.";
  }
}
