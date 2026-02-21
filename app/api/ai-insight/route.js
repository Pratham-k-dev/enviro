export async function POST(req) {
  try {
    const data = await req.json();
    const { type, env, conditions } = data;

    // env shape expected:
    // { aqi, pm25, pm10, so2, no2, co, temp, humidity, wind, uv, condition, location }
    // type: "metrics" | "hazards"

    const userConditions = conditions?.length
      ? conditions.join(", ")
      : "No specific health conditions";

    let prompt = "";

    if (type === "metrics") {
      prompt = `
You are an environmental health expert. A user in ${env.location || "their area"} has the following real-time environmental readings:

- AQI (Air Quality Index): ${env.aqi ?? "N/A"}
- PM2.5: ${env.pm25 ?? "N/A"} µg/m³
- PM10: ${env.pm10 ?? "N/A"} µg/m³
- Temperature: ${env.temp ?? "N/A"}°C
- Humidity: ${env.humidity ?? "N/A"}%
- Wind Speed: ${env.wind ?? "N/A"} m/s
- UV Index: ${env.uv ?? "N/A"}
- Weather Condition: ${env.condition ?? "N/A"}
- User health conditions: ${userConditions}

Write a short, plain-English explanation of what these readings mean for this specific person's daily health. Structure it as:
1. A 1-sentence overall summary of the environment right now.
2. The top 2–3 readings that stand out (good or bad), and what they mean practically.
3. One sentence on how the user's health conditions interact with these readings.

Be conversational, specific, and avoid generic advice. Do not use bullet points — write in flowing paragraphs. Max 120 words.
`.trim();
    } else if (type === "hazards") {
      prompt = `
You are a toxicologist and public health expert. A user in ${env.location || "their area"} has these air quality chemical readings:

- SO₂ (Sulfur Dioxide): ${env.so2 ?? "N/A"} µg/m³
- NO₂ (Nitrogen Dioxide): ${env.no2 ?? "N/A"} µg/m³
- CO (Carbon Monoxide): ${env.co ?? "N/A"} µg/m³
- PM2.5: ${env.pm25 ?? "N/A"} µg/m³
- PM10: ${env.pm10 ?? "N/A"} µg/m³
- User health conditions: ${userConditions}

Explain the biological impact of these specific chemicals on the human body given these levels. Focus on:
1. Which chemical is currently the most concerning and why.
2. What organs or body systems are affected at these levels.
3. How the user's health conditions make them more or less vulnerable.

Be specific to the numbers provided — do not give generic chemical descriptions. Write in 2 short paragraphs. Max 130 words.
`.trim();
    } else {
      return Response.json({ error: "Invalid type. Use 'metrics' or 'hazards'." }, { status: 400 });
    }

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        "X-Title": "EnvHealth App",
      },
      body: JSON.stringify({
        model:  "openai/gpt-4o-mini", // free tier — swap to openai/gpt-4o-mini for better quality
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 250,
        temperature: 0.6,
      }),
    });

    const result = await res.json();

    if (!res.ok || result.error) {
      console.error("OpenRouter error:", result.error);
      throw new Error(result.error?.message || `OpenRouter failed (${res.status})`);
    }

    const text = result.choices?.[0]?.message?.content?.trim();

    if (!text) {
      return Response.json({ text: "Could not generate insight." });
    }

    return Response.json({ text });
  } catch (err) {
    console.error("AI Insight Error:", err.message);
    return Response.json(
      { text: "AI insight unavailable. Please try again later." },
      { status: 500 }
    );
  }
}