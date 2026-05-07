/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-black': '#0A0A0A',
        'brand-blue': '#1E90FF',
        'brand-blue-dark': '#1565C0',
        'brand-blue-deeper': '#0D47A1',
        'brand-white': '#F5F5F5',
      },
      fontFamily: {
        glitch: ['"Rubik Glitch"', 'monospace'],
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(400%)' },
        },
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
        countGlow: {
          '0%, 100%': { textShadow: '0 0 8px rgba(30,144,255,0.4)' },
          '50%': { textShadow: '0 0 24px rgba(30,144,255,0.9)' },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.7s ease-out forwards',
        'scan-line': 'scanLine 3s linear infinite',
        'count-glow': 'countGlow 1s ease-in-out infinite',
      },
      backgroundImage: {
        'blue-gradient': 'linear-gradient(135deg, #1E90FF, #1565C0)',
        'hero-gradient': 'radial-gradient(ellipse at 60% 50%, rgba(30,144,255,0.12) 0%, transparent 70%)',
        'grid-pattern':
          'linear-gradient(rgba(30,144,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(30,144,255,0.04) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-size': '64px 64px',
      },
      boxShadow: {
        'glow-sm': '0 0 12px rgba(30,144,255,0.3)',
        'glow-md': '0 0 28px rgba(30,144,255,0.45)',
        'glow-lg': '0 0 60px rgba(30,144,255,0.25)',
        glass: '0 8px 40px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
};
