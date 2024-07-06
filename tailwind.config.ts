/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.{js,vue,ts}",
    "./pages/**/*.{js,vue,ts}",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#23967f',
        'primary-800': '#23967f80',
        secondary: '#DB93B0',
        accent: '#7DAF9C',
        'accent-200': '#7DAF9C20',
        neutral: '#F7BFB4',
        background: '#F5F5F5',
        text: '#212121',
        wenge: '#5B4B49'
      },
    },
  },
  plugins: [],
}