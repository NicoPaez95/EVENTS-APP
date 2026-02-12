// ===============================
// Tailwind CSS Configuration
// -------------------------------
// Defines the files Tailwind scans
// and allows theme customization.
// ===============================

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Files where Tailwind utility classes are used
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Extend default theme here (colors, spacing, fonts, etc.)
    },
  },
  plugins: [
    // Add Tailwind plugins here if needed
  ],
};
