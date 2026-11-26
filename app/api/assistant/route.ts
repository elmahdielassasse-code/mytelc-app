type ConversationMessage = {
  role: "user" | "assistant";
  content: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "L’assistant IA n’est pas configuré. Ajoutez OPENAI_API_KEY dans l’environnement serveur." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }

  if (!isRecord(body) || !Array.isArray(body.messages) || body.messages.length === 0 || body.messages.length > 12) {
    return Response.json({ error: "La conversation est invalide." }, { status: 400 });
  }

  const messages: ConversationMessage[] = [];
  for (const item of body.messages) {
    if (
      !isRecord(item) ||
      (item.role !== "user" && item.role !== "assistant") ||
      typeof item.content !== "string" ||
      item.content.trim().length === 0 ||
      item.content.length > 1800
    ) {
      return Response.json({ error: "Un message est vide ou trop long." }, { status: 400 });
    }

    messages.push({ role: item.role, content: item.content.trim() });
  }

  if (messages[messages.length - 1]?.role !== "user") {
    return Response.json({ error: "Le dernier message doit être une question." }, { status: 400 });
  }

  let upstream: Response;
  try {
    upstream = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are MyTelc AI Assistant, a friendly tutor for TELC Deutsch B1 preparation. Help with B1 vocabulary, grammar, Lesen, Hören, Schreiben, practice exercises, and exam strategies. Reply in the language of the user's latest message: German, French, or Moroccan Darija/Arabic; match mixed-language requests naturally. Keep explanations practical and accessible, include short examples when useful, and do not claim to be an official TELC service or guarantee exam results. If a request is outside TELC B1 learning, politely guide the user back to their preparation. If unsure, say so rather than inventing facts.",
          },
          ...messages,
        ],
        max_tokens: 800,
        temperature: 0.5,
      }),
      signal: AbortSignal.timeout(25000),
    });
  } catch (error) {
    const message = error instanceof Error && error.name === "TimeoutError"
      ? "Le service IA met trop de temps à répondre. Réessaie dans un instant."
      : "Impossible de joindre le service IA pour le moment.";
    return Response.json({ error: message }, { status: 502 });
  }

  if (!upstream.ok) {
    return Response.json({ error: "Le service IA a refusé la demande. Réessaie plus tard." }, { status: 502 });
  }

  let result: unknown;
  try {
    result = await upstream.json();
  } catch {
    return Response.json({ error: "Le service IA a renvoyé une réponse illisible." }, { status: 502 });
  }

  const firstChoice =
    isRecord(result) && Array.isArray(result.choices) ? result.choices[0] : undefined;
  const assistantMessage = isRecord(firstChoice) ? firstChoice.message : undefined;
  const reply = isRecord(assistantMessage) ? assistantMessage.content : undefined;

  if (typeof reply !== "string" || reply.trim().length === 0) {
    return Response.json({ error: "Le service IA n’a pas fourni de réponse." }, { status: 502 });
  }

  return Response.json({ reply: reply.trim() });
}
