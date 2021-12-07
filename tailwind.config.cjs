module.exports = {
  // add this section
  purge: [
    './src/**/*.css',
    './src/**/*.svelte'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: { inset: ['active'] },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}