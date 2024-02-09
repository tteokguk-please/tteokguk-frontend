import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { VitePluginRadar } from "vite-plugin-radar";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: "**/*.svg",
    }),
    VitePluginRadar({
      enableDev: true,
      analytics: {
        id: process.env.VITE_GA_TRACKING_ID,
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
