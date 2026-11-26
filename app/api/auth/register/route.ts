import { getSupabaseAuthConfig } from "../../_lib/supabase";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function POST(request: Request) {
  const config = getSupabaseAuthConfig();
  if (!config) {
    return Response.json(
      { error: "L’inscription n’est pas configurée. Ajoutez les variables Supabase côté serveur." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }

  if (!isRecord(body)) {
    return Response.json({ error: "Informations d’inscription invalides." }, { status: 400 });
  }

  const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (fullName.length < 2 || fullName.length > 100) {
    return Response.json({ error: "Le nom doit contenir entre 2 et 100 caractères." }, { status: 400 });
  }
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Adresse e-mail invalide." }, { status: 400 });
  }
  if (password.length < 8 || password.length > 128) {
    return Response.json({ error: "Le mot de passe doit contenir entre 8 et 128 caractères." }, { status: 400 });
  }

  let response: Response;
  try {
    response = await fetch(`${config.url}/auth/v1/signup`, {
      method: "POST",
      headers: {
        apikey: config.anonKey,
        Authorization: `Bearer ${config.anonKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        data: { full_name: fullName },
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
  } catch {
    return Response.json({ error: "Impossible de joindre le service d’inscription." }, { status: 502 });
  }

  if (!response.ok) {
    return Response.json(
      { error: "Inscription impossible. Vérifiez les informations ou utilisez une autre adresse e-mail." },
      { status: response.status === 429 ? 429 : 400 },
    );
  }

  return Response.json(
    { message: "Inscription enregistrée. Vérifiez votre e-mail si une confirmation est requise." },
    { status: 201 },
  );
}
