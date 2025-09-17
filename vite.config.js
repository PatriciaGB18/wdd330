import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src",       // pasta de origem dos arquivos
  base: "./",        // caminhos relativos
  build: {
    outDir: "../docs",  // gera a pasta docs pronta para GitHub Pages
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
      },
    },
  },
});

