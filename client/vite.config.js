import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import https from "https";

export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd());

  return {
    base: "./",
    plugins: [react()],
    resolve: {
      alias: {
        "@images": "/src",
      },
    },
    server: {
      proxy:
        mode === "development"
          ? {
              "/api": {
                target: env.VITE_PROXY_TARGET || "https://test.draftnew.site",
                changeOrigin: true,
                secure: false,
                rewrite: (path) =>
                  path.replace(/^\/api/, "/laravel/public/api/application"),
                agent: new https.Agent({ rejectUnauthorized: false }),
              },
            }
          : undefined,
    },
  };
});
