import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base:"/",
    plugins: [react()],
    server: {
      port: 6064,
      open: true,
      host: true,
    },
    build: {
      outDir: "dist",
      emptyOutDir: true,
    },
    define: {
      "process.env": env,
    },
  };
});
