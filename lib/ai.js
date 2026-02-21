export async function generateHealthInsight(data) {
    
  const prompt = `
You are an environmental health assistant.

Data:
AQI: ${data.aqi}
Temperature: ${data.temp}
Humidity: ${data.humidity}
User condition: ${data.conditions?.join(", ") || "None"}

Explain risks briefly and give 2 practical suggestions.
`;

  try {
   await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${process.env.OPENROUTER_KEY}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "mistralai/mistral-7b-instruct",
    messages: [
      { role: "user", content: "Explain AQI 160 risk for asthma patient" }
    ]
  })
})

    const result = await res.json();

    if (!res.ok || result.error) {
      throw new Error(result.error || `HF request failed (${res.status})`);
    }

    if (Array.isArray(result) && result[0]?.generated_text) {
      return result[0].generated_text.trim();
    }

    if (result.generated_text) {
      return result.generated_text.trim();
    }

    return "AI could not generate insight.";
  } catch (err) {
    console.error("HF INSIGHT ERROR:", err.message);
    return "AI insight unavailable right now.";
  }
}