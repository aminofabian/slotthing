'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, RefreshCcw, Sparkles, Star } from 'lucide-react';
import React from 'react';

const NotFound = () => {
  // Slot machine symbols for animation
  const symbols = ['7️⃣', '🎰', '💎', '🎲', '👑'];
  const [windowSize, setWindowSize] = React.useState({ width: 0, height: 0 });
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) {
    return null;
  }
  
  return (
    <main className="min-h-screen bg-[#0E0E0E] relative overflow-hidden flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A]/50 via-[#0E0E0E]/50 to-[#1A1A1A]/50" />
        
        {/* Slot Machine Reels Effect */}
        <div className="absolute inset-0 flex justify-around opacity-10">
          {[1, 2, 3].map((reel) => (
            <motion.div
              key={reel}
              className="h-full w-px bg-gradient-to-b from-transparent via-[#FFB000] to-transparent"
              animate={{
                y: [0, 1000],
                opacity: [0.1, 0.5, 0.1]
              }}
              transition={{
                duration: 2 + reel,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
        
        {/* Animated Coins */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-6 h-6"
            initial={{ 
              x: Math.random() * windowSize.width,
              y: Math.random() * windowSize.height,
              scale: 0,
              opacity: 0 
            }}
            animate={{ 
              y: [null, Math.random() * -500],
              rotate: [0, 360],
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0]
            }}
            transition={{ 
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="w-full h-full bg-[#FFB000] rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-[#FFCF9D] rounded-full transform scale-75" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative container mx-auto px-4 py-32 text-center">
        {/* 404 Title */}
        <div className="relative inline-block mb-8">
          <motion.div
            className="text-[150px] sm:text-[200px] font-bold leading-none"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Slot Machine Display */}
            <div className="relative flex justify-center gap-4 perspective-1000">
              {[4, 0, 4].map((number, index) => (
                <motion.div
                  key={index}
                  className="relative w-32 h-48 sm:w-40 sm:h-56 bg-[#1A1A1A] rounded-xl border-4 border-[#FFB000] overflow-hidden"
                  initial={{ rotateX: 0 }}
                  animate={{ rotateX: [0, 360 * 5] }}
                  transition={{
                    duration: 2,
                    delay: index * 0.2,
                    ease: "easeOut"
                  }}
                >
                  {/* Slot Reel */}
                  <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center text-[#FFB000] font-digital"
                    initial={{ y: 0 }}
                    animate={{ 
                      y: [-1000, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: index * 0.2,
                      ease: "easeOut"
                    }}
                  >
                    {symbols.map((symbol, i) => (
                      <div key={i} className="py-2">{symbol}</div>
                    ))}
                    <div className="py-2 text-8xl">{number}</div>
                  </motion.div>
                  
                  {/* Glass Reflection */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
                  
                  {/* Side Lights */}
                  <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#FFB000] via-transparent to-[#FFB000]" />
                  <div className="absolute right-0 top-0 w-1 h-full bg-gradient-to-b from-[#FFB000] via-transparent to-[#FFB000]" />
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Decorative Star */}
          <motion.div
            className="absolute -right-8 -top-8"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Star className="w-12 h-12 text-[#FFB000]" />
          </motion.div>
        </div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] bg-clip-text text-transparent mb-4">
            Jackpot Not Found! 🎰
          </h2>
          <p className="text-[#FFCF9D]/70 text-lg">
            Looks like this spin didn't hit the winning combination. Don't worry, your luck might be better on another page!
          </p>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] text-black font-bold rounded-xl flex items-center gap-2"
            >
              <Home className="w-5 h-5" />
              <span>Back to Casino</span>
            </motion.button>
          </Link>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-[#1A1A1A] text-[#FFCF9D] font-bold rounded-xl border-2 border-[#FFB000]/20 flex items-center gap-2 hover:bg-[#1A1A1A]/60"
          >
            <RefreshCcw className="w-5 h-5" />
            <span>Try Another Spin</span>
          </motion.button>
        </div>

        {/* Spotlight Effect */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-transparent to-[#0E0E0E] opacity-60" />
      </div>
    </main>
  );
};

export default NotFound;
