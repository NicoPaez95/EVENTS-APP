// ===============================
// Tailwind CSS Configuration
// -------------------------------
// Defines the project's design tokens and 
// determines which files the compiler scans 
// to generate utility classes.
// ===============================

/** * @type {import('tailwindcss').Config} 
 * * This configuration ensures Tailwind's "Just-In-Time" (JIT) engine 
 * scans the correct files and allows for project-specific 
 * theme extensions like colors or custom spacing.
 */
module.exports = {
  content: [
    /**
     * Paths to all of our components and pages.
     * Tailwind will tree-shake any unused styles based on these files.
     */
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      /**
       * Custom Theme Extensions.
       * * Tip: Since you're building an events app, you could add 
       * custom colors like 'brand-primary' or 'event-tech' here.
       */
    },
  },
  plugins: [
    /**
     * Official or custom plugins (e.g., forms, typography, line-clamp).
     */
  ],
};