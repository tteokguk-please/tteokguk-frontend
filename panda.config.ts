import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    tokens: {
      colors: {
        white: { value: "#FFFFFF" },
        back: { value: "#FBF8EF" },
        black: { value: "#1B1B1B" },
        gray: { 50: { value: "#929292" } },
        primary: {
          10: { value: "#F5EFDF" },
          20: { value: "#F4ECD4" },
          45: { value: "#E8E3D2" },
          60: { value: "#EEE2BE" },
          80: { value: "#EADCB1" },
          100: { value: "#F8D97E" },
        },
        secondary: {
          50: { value: "#B3D6D4" },
          100: { value: "#83C7C3" },
        },
        red: { 100: { value: "#F63333" } },
        green: { 100: { value: "#37C35E" } },
      },
    },
    extend: {},
  },

  // The output directory for your css system
  outdir: "styled-system",
});
