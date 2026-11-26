export type LocalUser = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

const STORAGE_KEY = "mytelc-registered-users";
const USERS_UPDATED_EVENT = "mytelc-users-updated";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function readLocalUsers(): LocalUser[] {
  const rawUsers = window.localStorage.getItem(STORAGE_KEY);
  if (rawUsers === null) return [];

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawUsers);
  } catch {
    throw new Error("Les données locales des comptes sont illisibles.");
  }

  if (!Array.isArray(parsed)) {
    throw new Error("Le format des comptes locaux est invalide.");
  }

  const users: LocalUser[] = [];
  for (const value of parsed) {
    if (
      !isRecord(value) ||
      typeof value.id !== "string" ||
      typeof value.name !== "string" ||
      typeof value.email !== "string" ||
      typeof value.createdAt !== "string"
    ) {
      throw new Error("Une entrée de compte locale est invalide.");
    }

    users.push({
      id: value.id,
      name: value.name,
      email: value.email,
      createdAt: value.createdAt,
    });
  }

  return users.sort((first, second) => second.createdAt.localeCompare(first.createdAt));
}

function saveLocalUsers(users: LocalUser[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  window.dispatchEvent(new Event(USERS_UPDATED_EVENT));
}

export function addLocalUser(name: string, email: string) {
  const users = readLocalUsers();
  if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
    throw new Error("Cette adresse e-mail est déjà inscrite sur cet appareil.");
  }

  const user: LocalUser = {
    id: crypto.randomUUID(),
    name,
    email,
    createdAt: new Date().toISOString(),
  };
  saveLocalUsers([user, ...users]);
}

export function deleteLocalUser(userId: string) {
  const users = readLocalUsers();
  saveLocalUsers(users.filter((user) => user.id !== userId));
}

export const localUsersUpdatedEvent = USERS_UPDATED_EVENT;
