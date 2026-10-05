/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: { brand: { DEFAULT: "#d62828", dark: "#a81c1c", tint: "#fdecec" } },
    },
  },
  plugins: [],
};
