/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'earthy-green': '#4A7C59',
        'sunlit-gold': '#F4D35E',
        'rich-soil-brown': '#4B3F35',
        'morning-mist': '#F9F6F0',
        'soft-clay': '#F0E9DF',
        'harvest-red': '#C85A5A',
        'clear-sky-blue': '#7FB3D5',
      },
    },
  },
  plugins: [],
};
