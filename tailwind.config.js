/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{html,js}",
    "./popup.js",
    "./manifest.json"
  ],
  theme: {
    extend: {
      colors: {
        tealishStats: '#00B09A',
        lightblackStats: '#333333',
        redStats: '#C53B3B',
        lightgreyStats: '#D3D3D3',
        blueblack: '#000016',
        greenLdrBrd: '#4ade80',
        purpleLdrBrd: '#6366f1',
        blueLdrBrd:  '#0ea5e9'
      },
      spacing: {
        '668px': '668px',
        '872px': '872px',
        '579px': '579px',
        '1112px': '1112px',
      },
    },
  },
  plugins: [],
}
