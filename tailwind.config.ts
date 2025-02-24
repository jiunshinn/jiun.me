import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    typography: {
      DEFAULT: {
        css: {
          "code::before": { content: "none" },
          "code::after": { content: "none" },
          "blockquote p:first-of-type::before": { content: "none" },
          "blockquote p:last-of-type::after": { content: "none" },
          h1: {
            fontSize: "2.25rem",
            marginTop: "2.5rem",
            marginBottom: "1.5rem",
          },
          h2: {
            fontSize: "1.875rem",
            marginTop: "2.25rem",
            marginBottom: "1.25rem",
          },
          h3: {
            fontSize: "1.5rem",
            marginTop: "2rem",
            marginBottom: "1rem",
          },
          pre: {
            backgroundColor: "transparent",
            padding: "0",
            lineHeight: "inherit",
          },
          "pre code": {
            fontSize: "inherit",
            lineHeight: "inherit",
            fontWeight: "inherit",
          },
        },
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        lightBg: "#f9fafb",
        lightText: "#1f2937",
        darkBg: "#1f2937",
        darkText: "#f9fafb",
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
