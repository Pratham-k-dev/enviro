export async function POST(req) {
  try {
    const { messages = [], data = {} } = await req.json();

    // Construct a clear prompt for the model
    const prompt = `You are a health assistant. 
    Context: ${JSON.stringify(data)}
    User Question: ${messages[messages.length - 1]?.content}`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        }),
      }
    );

    const json = await res.json();

    // Handle potential API errors from Google
    if (json.error) {
      console.error("Gemini API Error:", json.error);
      return Response.json({ text: `Google API Error: ${json.error.message}` }, { status: json.error.code });
    }

    const text = json?.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a response.";

    return Response.json({ text });

  } catch (err) {
    console.error("Fetch Error:", err);
    return Response.json({ text: "Backend connectivity issue." }, { status: 500 });
  }
}