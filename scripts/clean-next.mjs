import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const nextDir = path.join(root, ".next");

try {
  fs.rmSync(nextDir, { recursive: true, force: true });
  console.log("Removed", nextDir);
} catch (e) {
  console.error(
    "Could not delete .next (files locked). Stop `npm run dev` (Ctrl+C), then run again.\n",
    e instanceof Error ? e.message : e
  );
  process.exit(1);
}
