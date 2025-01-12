'use client';

import React from 'react';
import { Menu, X, User, LogIn } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

const NavBar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { theme } = useTheme();

  const navItems = [
    { name: 'Games', href: '#games' },
    { name: 'Tournaments', href: '#tournaments' },
    { name: 'Rewards', href: '#rewards' },
    { name: 'VIP', href: '#vip' },
  ];

  return (
    <nav className="relative">
      {/* Background blur and gradient */}
      <div className={`absolute inset-0 backdrop-blur-md transition-colors duration-300
        ${theme === 'dark' 
          ? 'bg-gradient-to-r from-purple-950/80 via-purple-900/80 to-purple-950/80'
          : 'bg-gradient-to-r from-white/80 via-purple-50/80 to-white/80'}`}>
      </div>

      {/* Animated border */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent animate-gradient-x"></div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-0 left-1/4 w-64 h-64 rounded-full blur-3xl transform -translate-y-32 transition-colors duration-300
          ${theme === 'dark' ? 'bg-yellow-400/5' : 'bg-yellow-400/10'}`}></div>
        <div className={`absolute top-0 right-1/4 w-64 h-64 rounded-full blur-3xl transform -translate-y-32 transition-colors duration-300
          ${theme === 'dark' ? 'bg-purple-600/10' : 'bg-purple-400/10'}`}></div>
      </div>

      {/* Main content */}
      <div className="relative container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="relative group">
            <div className={`absolute inset-0 rounded-lg blur-lg transform group-hover:scale-110 transition-all duration-300
              ${theme === 'dark'
                ? 'bg-gradient-to-r from-yellow-400/20 to-purple-600/20'
                : 'bg-gradient-to-r from-yellow-400/30 to-purple-400/30'}`}>
            </div>
            <a href="/" className={`relative text-2xl font-bold transition-colors duration-300
              ${theme === 'dark'
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-purple-600'}`}>
              Slot Thing
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative group px-4 py-2"
              >
                <span className={`relative z-10 transition-colors duration-200
                  ${theme === 'dark'
                    ? 'text-gray-300 group-hover:text-yellow-400'
                    : 'text-gray-600 group-hover:text-purple-600'}`}>
                  {item.name}
                </span>
                <div className={`absolute inset-0 rounded-lg transition-colors duration-200
                  ${theme === 'dark'
                    ? 'group-hover:bg-yellow-400/10'
                    : 'group-hover:bg-purple-100'}`}>
                </div>
              </a>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <div className="mr-2">
              <ThemeToggle />
            </div>

            {/* Login Button */}
            <button className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300
              ${theme === 'dark'
                ? 'bg-purple-900/50 border-yellow-400/10 hover:border-yellow-400/50 text-gray-300'
                : 'bg-white/50 border-purple-200 hover:border-purple-400 text-gray-600'}`}>
              <LogIn className={theme === 'dark' ? 'w-4 h-4 text-yellow-400' : 'w-4 h-4 text-purple-500'} />
              <span>Login</span>
            </button>

            {/* Sign Up Button */}
            <button className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300
              ${theme === 'dark'
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-purple-900 hover:brightness-110'
                : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:brightness-110'}`}>
              <User className="w-4 h-4" />
              <span>Sign Up</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg border transition-all duration-300
                ${theme === 'dark'
                  ? 'bg-purple-900/50 border-yellow-400/10 hover:border-yellow-400/50'
                  : 'bg-white/50 border-purple-200 hover:border-purple-400'}`}
            >
              {isOpen ? (
                <X className={theme === 'dark' ? 'w-6 h-6 text-yellow-400' : 'w-6 h-6 text-purple-500'} />
              ) : (
                <Menu className={theme === 'dark' ? 'w-6 h-6 text-yellow-400' : 'w-6 h-6 text-purple-500'} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className={`px-2 pt-2 pb-3 space-y-1 rounded-b-xl backdrop-blur-lg transition-colors duration-300
              ${theme === 'dark'
                ? 'bg-purple-950/90'
                : 'bg-white/90'}`}>
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-lg transition-all duration-200
                    ${theme === 'dark'
                      ? 'text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/10'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-100'}`}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex items-center gap-2 mt-4">
                <button className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 flex-1
                  ${theme === 'dark'
                    ? 'bg-purple-900/50 border-yellow-400/10 hover:border-yellow-400/50 text-gray-300'
                    : 'bg-white/50 border-purple-200 hover:border-purple-400 text-gray-600'}`}>
                  <LogIn className={theme === 'dark' ? 'w-4 h-4 text-yellow-400' : 'w-4 h-4 text-purple-500'} />
                  <span>Login</span>
                </button>
                <button className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 flex-1
                  ${theme === 'dark'
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-purple-900 hover:brightness-110'
                    : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:brightness-110'}`}>
                  <User className="w-4 h-4" />
                  <span>Sign Up</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;