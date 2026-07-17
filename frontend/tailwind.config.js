/**
 * @file tailwind.config.js
 * @description Tailwind CSS framework design tokens configuration.
 * Maps application semantic color palettes, custom typography families,
 * layout surface variants, and interactive UI micro-animation keyframes.
 * @type {import('tailwindcss').Config}
 * @module config/tailwind
 * @author Nico Paez
 */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 1. Contrast Utilities & Typography Overlays
        inverse: '#FFFFFF',

        // 2. Brand Identity & Interactive States
        primary: {
          DEFAULT: '#00ACEE', // Main bright sky blue
          hover: '#0284C7',   // Deeper blue interaction variant
        },
        accent: {
          DEFAULT: '#2563EB', // High-contrast action blue
          hover: '#1D4ED8',   // Focus interaction state
          muted: '#EFF6FF',   // Subtle alert backgrounds
          light: '#60A5FA',   // Border highlight variants
          dark: '#0F1E43',    // Dark contextual text
        },

        // 3. UI Surface Container System
        surface: {
          DEFAULT: '#FCFCFD',  // Primary card container backgrounds
          subcard: '#F1F5F9',  // Secondary nesting structures
          page: '#F8FAFC',     // Structural application background canvas
          disabled: '#F8FAFC', // Read-only form components
          input: '#FFFFFF',    // Interactive field text inputs
        },

        // 4. Semantic Typographies & Layout Borders
        secondary: {
          DEFAULT: '#475569',
          title: '#0F172A',       // Main viewport layouts headings
          subtitle: '#334155',    // Inner section headers
          description: '#475569', // Body text paragraphs
          muted: '#94A3B8',       // Deactivated state descriptions
          border: '#E2E8F0',      // Standard container lines
          input: '#FFFFFF',       // Secondary form elements token
        },

        // 5. System Status Notifications
        danger: {
          DEFAULT: '#EF4444',
          hover: '#DC2626',
          light: '#FEF2F2',
        },
        success: '#10B981',
        action: {
          DEFAULT: '#0284C7',
          hover: '#0369A1',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Montserrat"', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shadowFloat: {
          '0%, 100%': {
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
            transform: 'scale(1)',
          },
          '50%': {
            boxShadow: '0 35px 60px -15px rgba(0, 0, 0, 0.15)',
            transform: 'scale(0.93)',
          },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.2)' },
          '40%': { transform: 'scale(1.05)' },
          '60%': { transform: 'scale(1.15)' },
        },
      },
      animation: {
        'float-slow': 'float 4s ease-in-out infinite',
        heartbeat: 'heartbeat 0.4s ease-in-out',
      },
    },
  },
  plugins: [],
};