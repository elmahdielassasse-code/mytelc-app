import { createHmac, createHash, timingSafeEqual } from "node:crypto";

const cookieName = "mytelc_admin_session";
const sessionDurationSeconds = 8 * 60 * 60;

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET;
}

export function isAdminRequest(request: Request) {
  const secret = getSessionSecret();
  if (!secret) return false;

  const cookie = request.headers
    .get("cookie")
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${cookieName}=`))
    ?.slice(cookieName.length + 1);
  if (!cookie) return false;

  const [expiresAt, signature, extra] = cookie.split(".");
  if (!expiresAt || !signature || extra !== undefined) return false;

  const expiresAtNumber = Number(expiresAt);
  if (!Number.isSafeInteger(expiresAtNumber) || expiresAtNumber <= Math.floor(Date.now() / 1000)) {
    return false;
  }

  const expected = createHmac("sha256", secret).update(expiresAt).digest();
  const actual = Buffer.from(signature, "base64url");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function createAdminSessionCookie() {
  const secret = getSessionSecret();
  if (!secret) return null;

  const expiresAt = String(Math.floor(Date.now() / 1000) + sessionDurationSeconds);
  const signature = createHmac("sha256", secret).update(expiresAt).digest("base64url");
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";

  return `${cookieName}=${expiresAt}.${signature}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${sessionDurationSeconds}${secure}`;
}

export function adminPasswordMatches(submittedPassword: string) {
  const configuredPassword = process.env.ADMIN_PASSWORD;
  if (!configuredPassword) return false;

  const submittedHash = createHash("sha256").update(submittedPassword).digest();
  const configuredHash = createHash("sha256").update(configuredPassword).digest();
  return timingSafeEqual(submittedHash, configuredHash);
}

export function clearAdminSessionCookie() {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${cookieName}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secure}`;
}
