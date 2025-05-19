/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ensure it scans your src files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: { // Important for MUI compatibility with Tailwind preflight
    preflight: false,
  }
}