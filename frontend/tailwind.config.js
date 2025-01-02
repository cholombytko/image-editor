/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundSize: {
        '40px': '40px 40px',
      },
      backgroundImage: {
        'radial-dots': `radial-gradient(circle, #000000 1px, rgba(0, 0, 0, 0) 1px)`,
      },
    },
  },
  plugins: [],
}

