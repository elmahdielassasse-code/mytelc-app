import {
  adminPasswordMatches,
  clearAdminSessionCookie,
  createAdminSessionCookie,
} from "../../_lib/admin-session";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function POST(request: Request) {
  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) {
    return Response.json({ error: "La connexion admin n’est pas configurée côté serveur." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }

  const password = isRecord(body) && typeof body.password === "string" ? body.password : "";
  if (!password || password.length > 256 || !adminPasswordMatches(password)) {
    return Response.json({ error: "Mot de passe incorrect." }, { status: 401 });
  }

  const cookie = createAdminSessionCookie();
  if (!cookie) {
    return Response.json({ error: "La session admin n’est pas configurée." }, { status: 503 });
  }

  return Response.json(
    { ok: true },
    { headers: { "Set-Cookie": cookie, "Cache-Control": "no-store" } },
  );
}

export async function DELETE() {
  return Response.json(
    { ok: true },
    { headers: { "Set-Cookie": clearAdminSessionCookie(), "Cache-Control": "no-store" } },
  );
}
