'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, User, LogIn } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import Link from 'next/link';

const NavBar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const navItems = [
    { name: 'Games', href: '#games' },
    { name: 'Tournaments', href: '#tournaments' },
    { name: 'Rewards', href: '#rewards' },
    { name: 'VIP', href: '#vip' },
  ];

  return (
    <nav className="navbar fixed w-full z-50">
      {/* Background */}
      <div className={`navbar-backdrop absolute inset-0 ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-black/70 via-black/50 to-black/70'
          : 'bg-gradient-to-b from-black/60 via-black/40 to-black/60'
      } backdrop-blur-[2px]`}></div>

      {/* Main content */}
      <div className="navbar-container relative z-10 container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="navbar-logo group">
          <span className="navbar-logo-icon relative">
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] opacity-20 group-hover:opacity-30 transition-opacity blur-md"></span>
            ♠
          </span>
          <span className="navbar-logo-text">Slot Thing</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-[#FFCF9D]/90 hover:text-[#FFCF9D] transition-colors font-medium"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/dashboard">
            <button className="px-4 py-2 rounded-full bg-black/50 backdrop-blur-xl border border-[#FFB000]/30 text-[#FFCF9D] font-medium hover:bg-black/60 transition-all transform hover:scale-105 hover:border-[#FFB000]/50">
              <span className="flex items-center space-x-2">
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </span>
            </button>
          </Link>
          <Link href="/dashboard">
            <button className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] text-black font-medium hover:from-[#FFCF9D] hover:to-[#FFB000] transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(255,176,0,0.3)]">
              <span className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Sign Up</span>
              </span>
            </button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg bg-black/50 backdrop-blur-xl border border-[#FFB000]/30 text-[#FFCF9D] hover:bg-black/60"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/70 backdrop-blur-md border-t border-[#FFB000]/30">
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-[#FFCF9D]/90 hover:text-[#FFCF9D] transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-[#FFB000]/30">
                <Link href="/dashboard">
                  <button className="w-full px-4 py-2 rounded-full bg-black/50 backdrop-blur-xl border border-[#FFB000]/30 text-[#FFCF9D] font-medium hover:bg-black/60 transition-all">
                    <span className="flex items-center justify-center space-x-2">
                      <LogIn className="w-4 h-4" />
                      <span>Login</span>
                    </span>
                  </button>
                </Link>
                <Link href="/dashboard">
                  <button className="w-full px-4 py-2 rounded-full bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] text-black font-medium hover:from-[#FFCF9D] hover:to-[#FFB000] transition-all">
                    <span className="flex items-center justify-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>Sign Up</span>
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;