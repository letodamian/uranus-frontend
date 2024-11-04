/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    backgroundImage: {
      'hero-pattern': "url('/assets/background.jpeg')",
    },
    fontFamily: {
      custom: ['ArcadeClassic', 'sans-serif'],
    },
  },
};
export const plugins = [daisyui];

