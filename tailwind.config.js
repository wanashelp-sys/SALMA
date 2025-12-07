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
        // SALMA Brand Colors from Logo
        'salma-primary': '#e36e6a',      // وردي غامق - Primary Pink
        'salma-secondary': '#eb9662',    // برتقالي دافئ - Warm Orange
        'salma-accent': '#f7d05b',       // أصفر كنوز - Golden Yellow
        'salma-bg': '#e7deef',           // بنفسجي فاتح - Light Purple
        'salma-text': '#562822',         // بني غامق - Dark Brown
        'salma-skin': '#f4ccab',         // بيج فاتح - Light Beige
        // Light variants for backgrounds
        'salma-pink-light': '#fde8e7',
        'salma-orange-light': '#fef3ed',
        'salma-yellow-light': '#fef9eb',
      },
      fontFamily: {
        tajawal: ['Tajawal', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
