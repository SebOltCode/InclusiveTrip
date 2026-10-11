import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    // The app is light-only for now (see index.css); other themes would only bloat the CSS
    themes: ["light"],
  },
  plugins: [daisyui],
};
