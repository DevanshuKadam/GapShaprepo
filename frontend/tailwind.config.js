/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Add custom dark mode color palette
        dark: {
          background: '#121212',
          surface: '#1E1E1E',
          text: '#E0E0E0',
          primary: '#3B82F6',
          secondary: '#6B7280'
        }
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}