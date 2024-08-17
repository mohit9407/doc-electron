/** @type {import('postcss-load-config').Config} */
const config = {
  content: ["./frontend/**/*.{js,jsx}"],
  plugins: {
    tailwindcss: {},
  },
};

export default config;
