/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all files in src
  ],
  theme: {
    extend: {
      colors: {
        whatsappGreen: "#075E54",
        whatsappTeal: "#128C7E",
        whatsappBeige: "#ECE5DD",
        whatsappGray: "#f0f0f0",
      },
    },
  },
  plugins: [],
};
