import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        lightBg: "#ffffff",
        lightText: "#000000",
        darkBg: "#181818",
        darkText: "#ffffff",
        accent: {
          DEFAULT: "#3b82f6",
          hover: "#2563eb",
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
