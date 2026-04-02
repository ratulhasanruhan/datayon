/**
 * Appwrite configuration. Set variables in `.env.local` when your backend is ready.
 * @see https://appwrite.io/docs
 */
export const appwriteConfig = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? "",
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? "",
  /** Server-only API key — never expose to the client */
  apiKey: process.env.APPWRITE_API_KEY ?? "",
} as const;

export function isAppwriteConfigured(): boolean {
  return Boolean(
    appwriteConfig.endpoint &&
      appwriteConfig.projectId &&
      appwriteConfig.apiKey.length > 0
  );
}

export function assertAppwriteEnv(): void {
  if (!appwriteConfig.endpoint || !appwriteConfig.projectId) {
    throw new Error(
      "Appwrite: set NEXT_PUBLIC_APPWRITE_ENDPOINT and NEXT_PUBLIC_APPWRITE_PROJECT_ID"
    );
  }
}
