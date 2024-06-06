import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import animate from "tailwindcss-animate";
import scrollbar from "tailwind-scrollbar";
import shadcnPlugin from "./src/plugins/shadcn-plugin";
import typographyPreset from "./src/plugins/typography-preset";

const config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  presets: [typographyPreset],
  plugins: [typography, animate, scrollbar, shadcnPlugin],
} satisfies Config;

export default config;
