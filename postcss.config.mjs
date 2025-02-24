/** @type {import('postcss-load-config').Config} */
const config = {
  pageExtensions: ["ts", "tsx", "mdx"],
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
