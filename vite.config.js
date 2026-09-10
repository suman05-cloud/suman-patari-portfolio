import { resolve } from "node:path";
import { defineConfig } from "vite";
import { sites } from "@openai/sites-vite-plugin";

export default defineConfig({
  plugins: [sites()],
  build: {
    outDir: "dist/client",
    rollupOptions: {
      input: {
        portfolio: resolve(process.cwd(), "index.html"),
        gallery: resolve(process.cwd(), "gallery.html"),
      },
    },
  },
});
