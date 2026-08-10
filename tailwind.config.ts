import type { Config } from "tailwindcss";
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
        sans: [
          "Pretendard Variable",
          "Pretendard",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
    },
  },
  plugins: [typography],
};

export default config;
