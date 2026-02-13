
import { GoogleGenAI } from "@google/genai";

export const getSalesAssistantResponse = async (userMessage: string, context: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Context of Current Inventory: ${context}\n\nUser Question: ${userMessage}`,
      config: {
        systemInstruction: "You are the Exotic Intel GTA Sales Assistant. Your goal is to help users understand luxury car import profitability between Toronto and the US. Use Google Search to find current US resale values and cross-border logistics news. Be professional, direct, and data-driven. Always cite your sources if provided by the search tool.",
        tools: [{ googleSearch: {} }],
        temperature: 0.2,
      },
    });
    
    return {
      text: response.text,
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return {
      text: "I'm having trouble connecting to the intelligence engine. Please try again.",
      sources: []
    };
  }
};

export const getNegotiationStrategy = async (carData: any, profitData: any) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Analyze the following luxury car arbitrage opportunity from Toronto to the USA:
    Vehicle: ${carData.year} ${carData.make} ${carData.model}
    Toronto List Price (CAD): ${carData.cadPrice}
    Calculated Net Profit (USD): ${profitData.netProfit}
    NAFTA/USMCA Status: ${carData.isNorthAmerican ? 'Eligible' : 'Non-Eligible'}
    Export Tax (25% Duty): ${profitData.taxAmount}
    
    Based on the Toronto (GTA) market and US luxury demand:
    1. Suggest an optimal "Buy" offer in Toronto (CAD) to maximize arbitrage.
    2. Suggest a "Listing Price" for the US market (USD).
    3. Provide 3 specific negotiation tactics for a GTA dealer and 2 for a US buyer.
    4. Highlight any regulatory risks (OMVIC or CBP).
    
    Format the response in structured JSON with keys: "buyPriceAdvice", "sellPriceAdvice", "tactics", "riskAlert".
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "You are a world-class automotive arbitrage consultant specializing in the Toronto (GTA) to US export market. Your advice is sharp, aggressive for profit, and legally sound.",
        responseMimeType: "application/json",
      },
    });
    
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Negotiation AI Error:", error);
    return null;
  }
};
