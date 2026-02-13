
import { GoogleGenAI } from "@google/genai";

export const getSalesAssistantResponse = async (userMessage: string, context: string) => {
  // Fixed: Initialize GoogleGenAI using process.env.API_KEY directly as a named parameter
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Context of Current Inventory: ${context}\n\nUser Question: ${userMessage}`,
      config: {
        systemInstruction: "You are the Exotic Intel GTA Sales Assistant. Your goal is to help users understand luxury car import profitability between Toronto and the US. Use Google Search to find current US resale values and cross-border logistics news. Be professional, direct, and data-driven. Always cite your sources if provided by the search tool.",
        tools: [{ googleSearch: {} }],
        temperature: 0.2, // Lower temperature for more factual business responses
      },
    });
    
    return {
      // Fixed: Use the .text property directly instead of a method call
      text: response.text,
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return {
      text: "I'm having trouble connecting to the intelligence engine. Please try again or contact our Toronto office directly.",
      sources: []
    };
  }
};
