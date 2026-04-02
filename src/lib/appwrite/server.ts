import { Account, Client, Databases, Storage, Users } from "node-appwrite";
import { appwriteConfig, assertAppwriteEnv } from "./config";

/**
 * Server-side Appwrite client (API key). Use only in Server Components,
 * Route Handlers, or Server Actions — never import in client components.
 */
export function getServerClient(): Client {
  assertAppwriteEnv();
  const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId);

  if (appwriteConfig.apiKey) {
    client.setKey(appwriteConfig.apiKey);
  }

  return client;
}

export function getDatabases(): Databases {
  return new Databases(getServerClient());
}

export function getStorage(): Storage {
  return new Storage(getServerClient());
}

export function getUsers(): Users {
  return new Users(getServerClient());
}

/** Account service (usually with session/JWT from cookies — wire when auth is added). */
export function getAccount(): Account {
  return new Account(getServerClient());
}
