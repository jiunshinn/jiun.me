import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

const mdxConfig = createMDX({
  extension: /\.mdx$/,
  options: {
    remarkPlugins: [remarkGfm], // GFM 지원
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: {
            dark: "one-dark-pro",
            light: "min-light",
          },
          keepBackground: true,
          // 언어별 별칭 설정
          languageAliases: {
            typescript: "ts",
            javascript: "js",
          },
        },
      ],
    ],
  },
});

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  experimental: {
    mdxRs: true, // Rust based MDX compiler
  },
};

export default mdxConfig(nextConfig);
