// ===============================
// Tailwind CSS Configuration
// -------------------------------
// Defines the project's design tokens and 
// determines which files the compiler scans 
// to generate utility classes.
// ===============================

/**
 * @type {import('tailwindcss').Config} 
 * * This configuration ensures Tailwind's "Just-In-Time" (JIT) engine 
 * scans the correct files and allows for project-specific 
 * theme extensions like colors or custom spacing.
 */
export default {
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
       * Custom Theme Extensions mapped by operational roles.
       */
      colors: {
        background: '#f8fafc',//'#F8FAFC',
        surface: ' #ffffff',//'#FFFFFF',
        inverse: '#ffffff',
        primary: {
          DEFAULT: '#0f172a',//'#0F172A',
          hover: '#1E293B',
          disabled: '#CBD5E1'
        },
        secondary: {
          DEFAULT: '#475569',
          light: '#F1F5F9',
          border: '#e2e8f0', //'#E2E8F0',
          muted: '#94A3B8',
        },
        accent: {
          DEFAULT: '#2563eb',// '#0EA5E9',
          hover: '#0284C7',
          muted: '#eff6ff',//'#E0F2FE',
          light: '#60a5fa',
          dark: '#0f1e43',

        },
        danger: {
          DEFAULT: '#EF4444',
          hover: '#DC2626',
          light: '#FEF2F2',
        }
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
            transform: 'scale(1)'
          },
          '50%': {
            boxShadow: '0 35px 60px -15px rgba(0, 0, 0, 0.15)',
            transform: 'scale(0.93)'
          },
        }

      },
      animation: {
        'float-slow': 'float 4s ease-in-out infinite',
      }
    },
  },
  plugins: [
    /**
     * Official or custom plugins (e.g., forms, typography, line-clamp).
     */
  ],
};