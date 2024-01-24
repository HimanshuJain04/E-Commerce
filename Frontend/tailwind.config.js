/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'infinite-scroll': 'infinite-scroll 20s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        }
      },
      screens: {
        'xsm': '450px',
        'sm': '620px',
        'md': '750px',
        'lg': '1050px',
        'xl': '1200px',
        '2xl': '1500px',
      },
    },
  },
  plugins: [],
}

