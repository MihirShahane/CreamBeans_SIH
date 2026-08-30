/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // "Roast" dark surfaces — warm near-black, not generic pure-black
        espresso: {
          950: '#0F0C0A',
          900: '#161210',
          800: '#1E1815',
          700: '#2A211C',
          600: '#3A2E26',
        },
        // "Bean" signature accent — caramel-to-latte gradient family
        bean: {
          200: '#F3D9A8',
          300: '#EAC17E',
          400: '#E0A85B',
          500: '#D18F3E',
          600: '#B0722C',
          700: '#8A5822',
        },
        // Verification / trust accent — cool contrast against warm base
        sprout: {
          300: '#8FE3D3',
          400: '#5FCDB8',
          500: '#3BB6A0',
        },
        cream: '#F6F1E7',
        parchment: '#B9AC9A',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(224, 168, 91, 0.55)',
        card: '0 8px 30px -12px rgba(0,0,0,0.6)',
      },
      backgroundImage: {
        'bean-gradient': 'linear-gradient(135deg, #F3D9A8 0%, #E0A85B 45%, #B0722C 100%)',
        'roast-fade': 'linear-gradient(180deg, rgba(15,12,10,0) 0%, #0F0C0A 100%)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pulseRing: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.55 },
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.5s ease-out both',
        pulseRing: 'pulseRing 2s ease-in-out infinite',
        shimmer: 'shimmer 1.6s linear infinite',
      },
    },
  },
  plugins: [],
}
