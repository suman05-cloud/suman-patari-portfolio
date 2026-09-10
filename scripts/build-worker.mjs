import { copyFile, mkdir, writeFile } from "node:fs/promises";

await mkdir("dist/server", { recursive: true });
await copyFile("worker/entry.js", "dist/server/index.js");
await writeFile("dist/server/wrangler.json", JSON.stringify({
  main: "index.js",
  compatibility_date: "2026-01-01",
  compatibility_flags: ["nodejs_compat"],
  assets: { directory: "../client", binding: "ASSETS", not_found_handling: "404-page" },
}, null, 2));
