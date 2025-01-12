'use client';

import { useTheme } from "../context/ThemeContext";
import NavBar from "./NavBar";

export function ClientThemeLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  
  return (
    <>
      {/* Background Layer */}
      <div className="fixed inset-0 z-0">
        {/* Background Pattern */}
        <div className={`absolute inset-0 transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-[radial-gradient(circle_at_center,rgba(120,53,15,0.05)_1px,transparent_1px)]'
            : 'bg-[radial-gradient(circle_at_center,rgba(88,28,135,0.05)_1px,transparent_1px)]'
        } bg-[length:24px_24px]`} />
        
        {/* Background Gradient */}
        <div className={`absolute inset-0 transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-purple-950/50 via-purple-900/50 to-purple-950/50'
            : 'bg-gradient-to-br from-white/50 via-purple-50/50 to-white/50'
        }`} />
        
        {/* Noise Texture */}
        <div className="absolute inset-0 backdrop-filter backdrop-opacity-50 mix-blend-overlay pointer-events-none bg-[url('/noise.png')]" />
      </div>

      {/* Content Layer */}
      <div className={`relative z-10 flex flex-col min-h-screen transition-colors duration-300 ${
        theme === 'dark' ? 'bg-purple-950' : 'bg-white'
      }`}>
        {/* Navbar with glass effect */}
        <div className={`sticky top-0 z-50 backdrop-blur-sm border-b transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-purple-950/95 border-yellow-400/20'
            : 'bg-white/95 border-purple-200'
        }`}>
          <NavBar />
        </div>

        {/* Main Content */}
        <main className="flex-grow relative">
          {children}
        </main>
      </div>
    </>
  );
}
