/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
import aspectRatio from "@tailwindcss/aspect-ratio";
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
    aspectRatio: {
      // Add custom aspect ratio for 393:852
      '10/16': '10 / 16', // Custom ratio utility
    },
  },
};
export const plugins = [daisyui, aspectRatio];

