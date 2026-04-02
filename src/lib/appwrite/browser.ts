"use client";

import { Account, Client, Databases } from "appwrite";

let browserClient: Client | null = null;

/**
 * Browser Appwrite client (no API key). For authenticated user flows later.
 */
export function getBrowserClient(): Client | null {
  if (typeof window === "undefined") return null;

  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

  if (!endpoint || !projectId) {
    return null;
  }

  if (!browserClient) {
    browserClient = new Client().setEndpoint(endpoint).setProject(projectId);
  }

  return browserClient;
}

export function getBrowserDatabases(): Databases | null {
  const client = getBrowserClient();
  return client ? new Databases(client) : null;
}

export function getBrowserAccount(): Account | null {
  const client = getBrowserClient();
  return client ? new Account(client) : null;
}
