import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  envPrefix: "REACT_",
  plugins: [
    federation({
      name: "care_camera_device",
      filename: "remoteEntry.js",
      exposes: {
        "./manifest": "./src/manifest.ts",
      },
      shared: ["react"],
    }),
    react(),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    modulePreload: {
      polyfill: false,
    },
    rollupOptions: {
      external: ["core/PageTitle"],
      output: {
        format: "esm",
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name].js",
      },
    },
  },
  server: {
    origin: "http://localhost:5173",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
