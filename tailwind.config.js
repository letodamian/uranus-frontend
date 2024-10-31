/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    fontFamily: {
      custom: ['ArcadeClassic', 'sans-serif'],
    },
  },
};
export const plugins = [];

