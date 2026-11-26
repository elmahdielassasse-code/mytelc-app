import { isAdminRequest } from "../../_lib/admin-session";
import { getSupabaseAdminConfig } from "../../_lib/supabase";

type AdminUser = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mapSupabaseUser(value: unknown): AdminUser | null {
  if (!isRecord(value) || typeof value.id !== "string" || typeof value.created_at !== "string") {
    return null;
  }

  const metadata = isRecord(value.user_metadata) ? value.user_metadata : null;
  return {
    id: value.id,
    name: metadata && typeof metadata.full_name === "string" ? metadata.full_name : "—",
    email: typeof value.email === "string" ? value.email : "—",
    createdAt: value.created_at,
  };
}

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return Response.json({ error: "Authentification admin requise." }, { status: 401 });
  }

  const config = getSupabaseAdminConfig();
  if (!config) {
    return Response.json({ error: "La connexion à Supabase n’est pas configurée." }, { status: 503 });
  }

  const users: AdminUser[] = [];
  const perPage = 1000;

  for (let page = 1; page <= 1000; page += 1) {
    let response: Response;
    try {
      response = await fetch(
        `${config.url}/auth/v1/admin/users?page=${page}&per_page=${perPage}`,
        {
          headers: {
            apikey: config.serviceRoleKey,
            Authorization: `Bearer ${config.serviceRoleKey}`,
          },
          cache: "no-store",
          signal: AbortSignal.timeout(15000),
        },
      );
    } catch {
      return Response.json({ error: "Impossible de joindre la base des utilisateurs." }, { status: 502 });
    }

    if (!response.ok) {
      return Response.json({ error: "Supabase n’a pas pu renvoyer la liste des utilisateurs." }, { status: 502 });
    }

    let result: unknown;
    try {
      result = await response.json();
    } catch {
      return Response.json({ error: "Réponse invalide de la base des utilisateurs." }, { status: 502 });
    }

    const pageUsers = isRecord(result) && Array.isArray(result.users) ? result.users : null;
    if (!pageUsers) {
      return Response.json({ error: "Format de réponse inattendu de Supabase." }, { status: 502 });
    }

    users.push(...pageUsers.map(mapSupabaseUser).filter((user): user is AdminUser => user !== null));
    if (pageUsers.length < perPage) {
      return Response.json(
        { users },
        { headers: { "Cache-Control": "no-store" } },
      );
    }
  }

  return Response.json({ error: "La liste des utilisateurs dépasse la limite de pagination." }, { status: 502 });
}

export async function DELETE(request: Request) {
  if (!isAdminRequest(request)) {
    return Response.json({ error: "Authentification admin requise." }, { status: 401 });
  }

  const config = getSupabaseAdminConfig();
  if (!config) {
    return Response.json({ error: "La connexion à Supabase n’est pas configurée." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }

  const userId = isRecord(body) && typeof body.id === "string" ? body.id : "";
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(userId)) {
    return Response.json({ error: "Identifiant utilisateur invalide." }, { status: 400 });
  }

  let response: Response;
  try {
    response = await fetch(`${config.url}/auth/v1/admin/users/${encodeURIComponent(userId)}`, {
      method: "DELETE",
      headers: {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
      },
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
  } catch {
    return Response.json({ error: "Impossible de joindre la base des utilisateurs." }, { status: 502 });
  }

  if (!response.ok) {
    return Response.json({ error: "La suppression de cet utilisateur a échoué." }, { status: 502 });
  }

  return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
