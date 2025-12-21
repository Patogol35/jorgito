export async function askOpenAI(message) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    return "La inteligencia avanzada no está configurada todavía.";
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Eres Daniela IA, la asistente virtual profesional del portafolio de Jorge Patricio Santamaría Cherrez. Responde de forma clara, profesional y orientada a reclutadores.",
          },
          {
            role: "user",
            content: message,
          },
        ],
        max_tokens: 250,
        temperature: 0.6,
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    return "Ocurrió un error al conectar con la inteligencia avanzada.";
  }
      }
