import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const mdxConfig = createMDX({
  extension: /\.mdx$/,
  options: {
    // Turbopack에서는 플러그인을 문자열로 지정해야 한다 (함수는 직렬화 불가)
    remarkPlugins: ["remark-gfm"], // GFM 지원
    rehypePlugins: [
      [
        "rehype-pretty-code",
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
};

export default mdxConfig(nextConfig);
