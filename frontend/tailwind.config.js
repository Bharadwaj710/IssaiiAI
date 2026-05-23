/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f8fafc', // slate-50
        card: '#ffffff', // white
        primary: '#6366f1', // indigo-500
        secondary: '#94a3b8', // slate-400
        accent: '#06b6d4', // cyan-500
        success: '#10b981', // emerald-500
        warning: '#f59e0b', // amber-500
        danger: '#ef4444', // red-500
        text: '#0f172a', // slate-900
        muted: '#64748b', // slate-500
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
