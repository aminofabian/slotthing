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
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />

      {/* Button container */}
      <div className="relative p-2 rounded-xl bg-purple-900/50 border border-yellow-400/10 
                    hover:border-yellow-400/50 transition-all duration-300 overflow-hidden">
        <div className="relative z-10 flex items-center gap-2 px-2">
          {/* Sun/Moon icons with rotation animation */}
          <div className="relative w-6 h-6">
            <div className={`absolute inset-0 transition-transform duration-500 ${theme === 'dark' ? 'rotate-0' : 'rotate-180'}`}>
              <Moon className="w-6 h-6 text-yellow-400" />
            </div>
            <div className={`absolute inset-0 transition-transform duration-500 ${theme === 'dark' ? '-rotate-180' : 'rotate-0'}`}>
              <Sun className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
          
          {/* Text label */}
          <span className="text-sm text-gray-300">
            {theme === 'dark' ? 'Dark' : 'Light'} Mode
          </span>
        </div>

        {/* Decorative stars */}
        <div className="absolute top-1 right-1">
          <Stars className={`w-3 h-3 text-yellow-400 transition-opacity duration-500 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`} />
        </div>
      </div>
    </button>
  );
}
