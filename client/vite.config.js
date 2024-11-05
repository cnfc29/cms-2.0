import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      "@images": "/src",
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});
