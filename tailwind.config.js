/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 5s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'twinkle': 'twinkle 1s ease-in-out infinite',
        'ray': 'ray 4s ease-in-out infinite',
        'rotate-y': 'rotateY 3s linear infinite',
        'chip-fall': 'chipFall 10s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'float-1': 'floatAnimation 8s ease-in-out infinite',
        'float-2': 'floatAnimation 9s ease-in-out infinite 1s',
        'float-3': 'floatAnimation 10s ease-in-out infinite 2s',
        'float-4': 'floatAnimation 11s ease-in-out infinite 3s',
        'float-5': 'floatAnimation 12s ease-in-out infinite 4s',
        'sway-1': 'swayAnimation 12s ease-in-out infinite',
        'sway-2': 'swayAnimation 13s ease-in-out infinite 2s',
        'sway-3': 'swayAnimation 14s ease-in-out infinite 4s',
        'pulse-slow': 'pulseAnimation 4s ease-in-out infinite',
        'rotate-slow-1': 'rotateAnimation 15s linear infinite',
        'rotate-slow-2': 'rotateAnimation 20s linear infinite reverse',
        'rotate-slow-3': 'rotateAnimation 25s linear infinite',
        'gradient-shift': 'gradientShift 8s ease-in-out infinite',
        'ray-float': 'rayFloat 4s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        floatAnimation: {
          '0%, 100%': { 
            transform: 'translate(0, 0) rotate(0deg)',
          },
          '25%': {
            transform: 'translate(10px, -15px) rotate(2deg)',
          },
          '50%': {
            transform: 'translate(-5px, -25px) rotate(-1deg)',
          },
          '75%': {
            transform: 'translate(-15px, -10px) rotate(-3deg)',
          },
        },
        swayAnimation: {
          '0%, 100%': {
            transform: 'rotate(-3deg) scale(1)',
          },
          '50%': {
            transform: 'rotate(3deg) scale(1.05)',
          },
        },
        pulseAnimation: {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '0.3',
          },
          '50%': {
            transform: 'scale(1.05)',
            opacity: '0.5',
          },
        },
        rotateAnimation: {
          '0%': {
            transform: 'rotate(0deg) translateY(0)',
          },
          '25%': {
            transform: 'rotate(90deg) translateY(10px)',
          },
          '50%': {
            transform: 'rotate(180deg) translateY(0)',
          },
          '75%': {
            transform: 'rotate(270deg) translateY(-10px)',
          },
          '100%': {
            transform: 'rotate(360deg) translateY(0)',
          },
        },
        twinkle: {
          '0%, 100%': { 
            opacity: '0.2',
            transform: 'scale(0.8)',
          },
          '50%': { 
            opacity: '0.5',
            transform: 'scale(1.2)',
          },
        },
        ray: {
          '0%': { 
            opacity: '0', 
            transform: 'rotate(0deg) scale(1)' 
          },
          '50%': { 
            opacity: '0.5', 
            transform: 'rotate(180deg) scale(1.5)' 
          },
          '100%': { 
            opacity: '0', 
            transform: 'rotate(360deg) scale(1)' 
          },
        },
        rotateY: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
        chipFall: {
          '0%': { 
            transform: 'translateY(-100%) rotate(0deg)',
            opacity: '0',
          },
          '10%': {
            opacity: '1',
          },
          '90%': {
            opacity: '1',
          },
          '100%': { 
            transform: 'translateY(100vh) rotate(720deg)',
            opacity: '0',
          },
        },
        gradientShift: {
          '0%, 100%': { 
            'background-position': '0% 50%',
          },
          '50%': { 
            'background-position': '100% 50%',
          },
        },
        rayFloat: {
          '0%, 100%': { 
            transform: 'translateY(0) rotate(var(--tw-rotate))',
            opacity: 'var(--tw-opacity)',
          },
          '50%': { 
            transform: 'translateY(-30px) rotate(var(--tw-rotate))',
            opacity: 'calc(var(--tw-opacity) * 1.5)',
          },
        },
        glow: {
          '0%, 100%': { 
            filter: 'brightness(1)',
          },
          '50%': { 
            filter: 'brightness(1.3)',
          },
        },
      },
    },
  },
  plugins: [],
}
