'use client';
import React from 'react';
import { Sun, Moon, Stars } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative group"
      aria-label="Toggle theme"
    >
      {/* Background container with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />

      {/* Button container */}
      <div className="relative p-2 rounded-xl bg-black/50 border border-[#FFCF9D]/10 
                    hover:border-[#FFCF9D]/50 transition-all duration-300 overflow-hidden">
        <div className="relative z-10 flex items-center gap-2 px-2">
          {/* Sun/Moon icons with rotation animation */}
          <div className="relative w-6 h-6">
            <div className={`absolute inset-0 transition-transform duration-500 ${theme === 'dark' ? 'rotate-0' : 'rotate-180'}`}>
              <Moon className="w-6 h-6 text-[#FFCF9D]" />
            </div>
            <div className={`absolute inset-0 transition-transform duration-500 ${theme === 'dark' ? '-rotate-180' : 'rotate-0'}`}>
              <Sun className="w-6 h-6 text-[#FFCF9D]" />
            </div>
          </div>
          
          {/* Text label */}
          <span className="text-sm text-[#FFCF9D]">
            {theme === 'dark' ? 'Dark' : 'Light'} Mode
          </span>
        </div>

        {/* Decorative stars */}
        <div className="absolute top-1 right-1">
          <Stars className={`w-3 h-3 text-[#FFCF9D] transition-opacity duration-500 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`} />
        </div>
      </div>
    </button>
  );
}
