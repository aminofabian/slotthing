/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-15px) scale(1.02)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.05)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        'spin-reverse-slow': {
          '0%': { transform: 'rotate(360deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.05)' },
          '100%': { transform: 'rotate(0deg) scale(1)' },
        },
        'pulse-slow': {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.1) rotate(3deg)' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-25px) scale(1.05)' },
        },
        'ticker': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
        'glow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'twinkle': {
          '0%, 100%': { 
            opacity: '0.2',
            transform: 'scale(0.8)',
          },
          '50%': { 
            opacity: '0.5',
            transform: 'scale(1.2)',
          },
        },
        'ray': {
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
        'rotateY': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
        'chipFall': {
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
        'gradientShift': {
          '0%, 100%': { 
            'background-position': '0% 50%',
          },
          '50%': { 
            'background-position': '100% 50%',
          },
        },
        'rayFloat': {
          '0%, 100%': { 
            transform: 'translateY(0) rotate(var(--tw-rotate))',
            opacity: 'var(--tw-opacity)',
          },
          '50%': { 
            transform: 'translateY(-30px) rotate(var(--tw-rotate))',
            opacity: 'calc(var(--tw-opacity) * 1.5)',
          },
        },
        'swayAnimation': {
          '0%, 100%': {
            transform: 'rotate(-3deg) scale(1)',
          },
          '50%': {
            transform: 'rotate(3deg) scale(1.05)',
          },
        },
        'pulseAnimation': {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '0.3',
          },
          '50%': {
            transform: 'scale(1.05)',
            opacity: '0.5',
          },
        },
        'rotateAnimation': {
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
        'floatAnimation': {
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
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'spin-slow': 'spin-slow 12s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'spin-reverse-slow': 'spin-reverse-slow 12s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'pulse-slow': 'pulse-slow 6s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'bounce-slow': 'bounce-slow 6s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'ticker': 'ticker 20s linear infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
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
      },
      colors: {
        primary: {
          DEFAULT: '#3B82F6',  // More subtle blue
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        secondary: {
          DEFAULT: '#64748B',  // Neutral slate
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        accent: {
          DEFAULT: '#8B5CF6',  // Subtle purple
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
        success: {
          DEFAULT: '#6BCB77',
          light: '#95D89E',
          dark: '#4FA559',
        },
        warning: {
          DEFAULT: '#FFB26B',
          light: '#FFC894',
          dark: '#FF9442',
        },
        error: {
          DEFAULT: '#FF6B6B',
          light: '#FF9494',
          dark: '#FF4242',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
    },
  },
  plugins: [],
}
