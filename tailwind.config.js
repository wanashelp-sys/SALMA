/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FD0000',        // Pure Red
        secondary: '#F4C181',      // Sandy Clay
        accent: '#572822',         // Espresso
        coffee: '#220005',         // Coffee Bean
        clay: '#763E2C',           // Clay Soil
        olive: '#A7B683',          // Muted Olive
        skyBlue: '#7DBECF',        // Sky Blue (Light)
        golden: '#926A2B',         // Golden Earth
        // Light variants for backgrounds
        redLight: '#ffe6e6',
        clayLight: '#fef3ed',
        espressoLight: '#f5efed',
      },
      fontFamily: {
        tajawal: ['Tajawal', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
