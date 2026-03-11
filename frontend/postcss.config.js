// ==========================================
// PostCSS Configuration
// ------------------------------------------
// This script acts as the CSS processing pipeline.
// It orchestrates how Tailwind CSS and Autoprefixer 
// transform your source styles into production-ready CSS.
// ==========================================

module.exports = {
  /**
   * PostCSS Plugins Pipeline.
   * The order of these plugins is crucial for the build process.
   */
  plugins: {
    /**
     * tailwindcss:
     * Compiles Tailwind's utility classes and directives (@tailwind) 
     * into standard CSS based on your tailwind.config.js.
     */
    tailwindcss: {},

    /**
     * autoprefixer:
     * Automatically adds vendor prefixes (e.g., -webkit-, -moz-) 
     * to CSS rules using values from Can I Use. 
     * Essential for cross-browser compatibility.
     */
    autoprefixer: {},
  },
};