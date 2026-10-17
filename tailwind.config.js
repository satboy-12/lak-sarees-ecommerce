/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Stitch Royal Heritage Couture luxury tokens
        primary: '#4a0117',
        'primary-container': '#68182b',
        'on-primary': '#ffffff',
        'primary-fixed': '#ffd9dd',
        'primary-fixed-dim': '#ffb2bc',
        secondary: '#775a1a',
        'secondary-container': '#fed489',
        'secondary-fixed': '#ffdea5',
        'secondary-fixed-dim': '#e9c178',
        'on-secondary': '#ffffff',
        'on-secondary-container': '#785a1b',
        surface: '#fff8f8',
        'surface-dim': '#e7d6d8',
        'surface-bright': '#fff8f8',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#fff0f2',
        'surface-container': '#fceaec',
        'surface-container-high': '#f6e4e6',
        'surface-container-highest': '#f0dee1',
        'surface-variant': '#f0dee1',
        'on-surface': '#22191b',
        'on-surface-variant': '#554244',
        'outline': '#877274',
        'outline-variant': '#dac0c2',
        'error': '#ba1a1a',
        'error-container': '#ffdad6',

        // Preserved LAK design tokens
        lak: {
          cream: '#f8f3e9',
          paper: '#fffdf8',
          maroon: '#4b101d',
          royalMaroon: '#68182b',
          wine: '#6e2030',
          gold: '#C6A15B',
          antiqueGold: '#b89453',
          ink: '#22191b',
          muted: '#82756e'
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'DM Sans', 'Arial', 'sans-serif'],
        'body-lg': ['Plus Jakarta Sans', 'sans-serif'],
        'body-md': ['Plus Jakarta Sans', 'sans-serif'],
        'body-sm': ['Plus Jakarta Sans', 'sans-serif'],
        'headline-lg': ['Playfair Display', 'serif'],
        'headline-md': ['Playfair Display', 'serif'],
        'headline-sm': ['Playfair Display', 'serif'],
        'display-lg': ['Playfair Display', 'serif'],
        'label-lg': ['Plus Jakarta Sans', 'sans-serif'],
        'label-md': ['Plus Jakarta Sans', 'sans-serif'],
        'label-sm': ['Plus Jakarta Sans', 'sans-serif'],
      },
      spacing: {
        'gutter': '1.5rem',
        'gutter-mobile': '1rem',
        'margin': '4rem',
        'margin-mobile': '1.25rem',
        'space-xs': '0.25rem',
        'space-sm': '0.5rem',
        'space-md': '1rem',
        'space-lg': '1.75rem',
        'space-xl': '3rem',
      },
      boxShadow: {
        soft: '0 18px 55px rgba(58, 28, 24, 0.09)',
        luxury: '0 12px 32px -8px rgba(31, 22, 24, 0.08), 0 2px 6px 0 rgba(198, 161, 91, 0.05)'
      }
    }
  },
  plugins: [],
}