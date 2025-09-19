import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true, // Isso garante que a pasta de saída seja limpa antes de cada build
  },
});