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
        'neutral-900': '#1D1E20FF',
        'neutral-800': '#28292FFF',
        'neutral-700': '#3C3E48FF',
        'neutral-600': '#595B69FF',
        'neutral-500': '#7B7F8EFF',
        'neutral-400': '#979AAAFF',
        'neutral-300': '#BCBEC8FF',
        'neutral-200': '#E0E1E6FF',
        'neutral-100': '#F9FAFAFF',
        'primary-100': '#E1F6C0FF',
        'primary-200': '#C6EF89FF',
        'primary-300': '#C1EE7FFF',
        'primary-400': '#B6EA67FF',
        'primary-500': '#A3E540FF',
        'primary-600': '#8EDA1EFF',
        'primary-700': '#71AC17FF',
        'primary-800': '#698312FF',
        'primary-900': '#454B32FF',
      },
    },
  },
  plugins: [],
};
