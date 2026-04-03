/**
 * CORS for public article JSON API (e.g. datayon-pcard and local dev).
 * Extend via `ARTICLE_API_ALLOWED_ORIGINS` (comma-separated).
 */
const DEFAULT_ALLOWED_ORIGINS = [
  "https://datayon-pcard.vercel.app",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
] as const;

function allowedOrigins(): string[] {
  const fromEnv =
    process.env.ARTICLE_API_ALLOWED_ORIGINS?.split(",")
      .map((s) => s.trim())
      .filter(Boolean) ?? [];
  return [...new Set([...DEFAULT_ALLOWED_ORIGINS, ...fromEnv])];
}

/** Headers for Access-Control-Allow-* when Origin matches allowlist. */
export function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get("origin");
  if (!origin || !allowedOrigins().includes(origin)) {
    return {};
  }
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

export function applyCors(request: Request, response: Response): Response {
  const extra = corsHeaders(request);
  for (const [k, v] of Object.entries(extra)) {
    response.headers.set(k, v);
  }
  return response;
}
