import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { VitePluginRadar } from "vite-plugin-radar";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [
      react(),
      svgr({
        include: "**/*.svg",
      }),
      VitePluginRadar({
        enableDev: true,
        analytics: {
          id: process.env.VITE_GA_TRACKING_ID,
          disable: process.env.NODE_ENV !== "production",
        },
      }),
    ],
    resolve: {
      alias: [
        { find: "@", replacement: "/src" },
        { find: "@styled-system", replacement: "/styled-system" },
      ],
    },
  });
};
