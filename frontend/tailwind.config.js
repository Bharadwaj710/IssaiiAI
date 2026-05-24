/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0F19', // Deep Navy
        card: '#111827', // Charcoal / Gray-900
        primary: '#FF6B00', // Orange
        secondary: '#1e293b', // Slate-800
        accent: '#06b6d4', // Cyan
        success: '#10b981', // Emerald
        warning: '#f59e0b', // Amber
        danger: '#ef4444', // Red
        text: '#ffffff', // White
        muted: '#9ca3af', // Gray-400
        borderline: '#1f2937', // Gray-800
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
