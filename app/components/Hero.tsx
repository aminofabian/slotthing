'use client';

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play, Trophy, Sparkles, Flame, Crown, Coins, Diamond, Dice1, Gamepad2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from '../context/ThemeContext';

const slides = [
  {
    image: "/1.jpg",
    badge: "HOT GAME",
    title: "777 Fortune",
    description: "Classic slots with a modern twist. 97.5% RTP!",
    stats: [
      { icon: <Coins className="w-8 h-8 text-yellow-400" />, value: "$100K", label: "Jackpot" },
      { icon: <Sparkles className="w-8 h-8 text-purple-400" />, value: "100", label: "Free Spins" },
      { icon: <Diamond className="w-8 h-8 text-blue-400" />, value: "5x", label: "Multiplier" }
    ]
  },
  {
    image: "/2.jpg",
    badge: "NEW",
    title: "Dragon's Vault",
    description: "Expanding Wilds & Massive Wins",
    stats: [
      { icon: <Coins className="w-8 h-8 text-yellow-400" />, value: "$250K", label: "Max Win" },
      { icon: <Dice1 className="w-8 h-8 text-green-400" />, value: "243", label: "Ways to Win" },
      { icon: <Crown className="w-8 h-8 text-pink-400" />, value: "96.8%", label: "RTP" }
    ]
  },
  {
    image: "/3.jpg",
    badge: "FEATURED",
    title: "Mega Gems",
    description: "Progressive Jackpots & Cascading Wins",
    stats: [
      { icon: <Diamond className="w-8 h-8 text-blue-400" />, value: "$500K", label: "Mega Prize" },
      { icon: <Flame className="w-8 h-8 text-orange-400" />, value: "50", label: "Pay Lines" },
      { icon: <Trophy className="w-8 h-8 text-yellow-400" />, value: "97.2%", label: "RTP" }
    ]
  }
];

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 8;
const DRAG_BUFFER = 50;
const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};

interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}

const StatCard = ({ icon, value, label }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center p-4 rounded-xl bg-black/70 backdrop-blur-xl border border-[#FFB000]/30 hover:border-[#FFB000]/50 transition-all hover:transform hover:scale-105 hover:bg-black/80"
      style={{
        boxShadow: '0 0 20px rgba(255, 176, 0, 0.1)',
      }}
    >
      <div className="relative">
        {icon}
        <div className="absolute inset-0 blur-sm opacity-50">{icon}</div>
      </div>
      <span className="mt-3 text-2xl font-black bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] bg-clip-text text-transparent">
        {value}
      </span>
      <span className="mt-1 text-sm font-medium text-[#FFCF9D]/70">
        {label}
      </span>
    </motion.div>
  );
};

export const Hero = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const dragX = useMotionValue(0);
  const { theme } = useTheme();

  useEffect(() => {
    if (isPaused) return;
    
    const intervalRef = setInterval(() => {
      const x = dragX.get();
      if (x === 0) {
        setImgIndex((pv) => (pv === slides.length - 1 ? 0 : pv + 1));
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, [isPaused]);

  const onDragEnd = () => {
    const x = dragX.get();
    if (x <= -DRAG_BUFFER && imgIndex < slides.length - 1) {
      setImgIndex((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((pv) => pv - 1);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Fixed Branding Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-start pt-16 md:pt-28 z-20 pointer-events-none">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl md:text-3xl font-bold mb-2 md:mb-4 text-[#FFCF9D] tracking-wide"
        >
          Unleash Your Fortune
        </motion.h2>
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-6xl md:text-8xl lg:text-9xl font-black text-center mb-4 md:mb-6 bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] bg-clip-text text-transparent tracking-tight px-4"
          style={{
            textShadow: '0 0 80px rgba(255, 176, 0, 0.3)',
            WebkitTextStroke: '2px rgba(255, 176, 0, 0.1)',
          }}
        >
          Slot Thing
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-4 md:gap-6 px-4 max-w-4xl w-full"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-2xl"></div>
            <p className="relative px-8 py-3 text-xl md:text-3xl text-center font-bold bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent leading-relaxed tracking-wide">
              Where Fortune Awaits
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center mt-4 md:mt-6 w-full max-w-3xl">
            <div className="relative group">
              <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-xl group-hover:bg-black/40 transition-colors"></div>
              <div className="relative flex flex-col items-center p-3 md:p-4 space-y-1.5 md:space-y-2">
                <span className="text-base md:text-lg font-bold text-[#FFB000]">Instant Wins</span>
                <span className="text-xs md:text-sm text-[#FFCF9D]/90">60s Payouts</span>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-xl group-hover:bg-black/40 transition-colors"></div>
              <div className="relative flex flex-col items-center p-3 md:p-4 space-y-1.5 md:space-y-2">
                <span className="text-base md:text-lg font-bold text-[#FFB000]">Elite Status</span>
                <span className="text-xs md:text-sm text-[#FFCF9D]/90">VIP Perks</span>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-xl group-hover:bg-black/40 transition-colors"></div>
              <div className="relative flex flex-col items-center p-3 md:p-4 space-y-1.5 md:space-y-2">
                <span className="text-base md:text-lg font-bold text-[#FFB000]">$1M+ Wins</span>
                <span className="text-xs md:text-sm text-[#FFCF9D]/90">Mega Jackpots</span>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-xl group-hover:bg-black/40 transition-colors"></div>
              <div className="relative flex flex-col items-center p-3 md:p-4 space-y-1.5 md:space-y-2">
                <span className="text-base md:text-lg font-bold text-[#FFB000]">Crypto Edge</span>
                <span className="text-xs md:text-sm text-[#FFCF9D]/90">Zero Fees</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Unique Play Now Button */}
        <div className="pointer-events-auto absolute bottom-2 md:bottom-4 lg:bottom-4">
          <Link href="/dashboard">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ 
                scale: 1.05,
                textShadow: "0 0 8px rgb(255,255,255)",
                boxShadow: "0 0 30px rgba(255,176,0,0.6)"
              }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] rounded-xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity animate-pulse"></div>
              <div className="relative px-8 py-3 rounded-xl bg-gradient-to-r from-[#FFB000] via-[#FFCF9D] to-[#FFB000] border-2 border-[#FFB000]/30 backdrop-blur-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-[60deg] transform-gpu transition-transform group-hover:translate-x-full duration-1000"></div>
                <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-10"></div>
                <span className="flex items-center gap-3 text-black text-base md:text-lg font-black tracking-wider">
                  <span className="relative bg-black/10 p-1.5 rounded-lg">
                    <Gamepad2 className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="absolute inset-0 bg-white/20 blur-sm rounded-lg"></span>
                  </span>
                  <span className="relative">
                    <span className="absolute -inset-1 bg-white/20 blur-sm rounded-lg"></span>
                    <span className="relative">PLAY NOW</span>
                  </span>
                </span>
              </div>
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute inset-y-0 left-4 flex items-center z-30">
        <button
          onClick={() => setImgIndex((pv) => (pv === 0 ? slides.length - 1 : pv - 1))}
          className="p-3 rounded-full bg-gradient-to-br from-purple-900/20 to-black/50 backdrop-blur-lg border border-purple-500/10 hover:from-purple-800/30 hover:to-black/60 transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-white/75" />
        </button>
      </div>

      <div className="absolute inset-y-0 right-4 flex items-center z-30">
        <button
          onClick={() => setImgIndex((pv) => (pv === slides.length - 1 ? 0 : pv + 1))}
          className="p-3 rounded-full bg-gradient-to-bl from-purple-900/20 to-black/50 backdrop-blur-lg border border-purple-500/10 hover:from-purple-800/30 hover:to-black/60 transition-all"
        >
          <ChevronRight className="w-6 h-6 text-white/75" />
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              imgIndex === index 
              ? 'bg-purple-400/70 w-4' 
              : 'bg-white/50 hover:bg-purple-300/50'
            }`}
            onClick={() => setImgIndex(index)}
          />
        ))}
      </div>

      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{
          x: dragX,
        }}
        animate={{
          translateX: `-${imgIndex * 100}%`,
        }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex h-full w-full"
      >
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            className="h-full w-full shrink-0 relative"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className={`absolute inset-0 ${
              theme === 'dark'
                ? 'bg-gradient-to-b from-black/70 via-black/50 to-black/70'
                : 'bg-gradient-to-b from-black/60 via-black/40 to-black/60'
            }`}>
              {/* Game-specific Content */}
              <div className="relative h-full flex flex-col items-center justify-end pb-32 px-4 backdrop-blur-[2px]">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={`badge-${index}-${slide.title}`}
                  transition={{ delay: 0.1 }}
                  className="mb-4 md:mb-6"
                >
                  <span className="px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-bold bg-black/70 backdrop-blur-xl border border-[#FFB000]/30 text-[#FFCF9D] shadow-lg shadow-black/20 whitespace-nowrap">
                    {slide.badge === "HOT GAME" ? "TRENDING NOW" :
                     slide.badge === "NEW" ? "JUST LAUNCHED" :
                     "PLAYER FAVORITE"}
                  </span>
                </motion.div>
                
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={`title-${index}-${slide.title}`}
                  transition={{ delay: 0.2 }}
                  className="text-3xl md:text-5xl font-black text-center mb-3 md:mb-4 bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] bg-clip-text text-transparent tracking-tight drop-shadow-xl px-4 whitespace-nowrap"
                >
                  {slide.title}
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={`desc-${index}-${slide.title}`}
                  transition={{ delay: 0.3 }}
                  className="text-base md:text-xl text-center mb-6 md:mb-8 max-w-xl text-[#FFCF9D]/90 font-medium px-4 leading-tight md:leading-relaxed"
                >
                  {index === 0 ? "Experience the thrill of next-gen slots with our signature game. Epic multipliers await!" :
                   index === 1 ? "Unleash the power of dragons in this epic adventure. Massive wins up to 10,000x!" :
                   "Chase the rainbow of precious gems in this cascading masterpiece of wins."}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={`stats-${index}-${slide.title}`}
                  transition={{ delay: 0.4 }}
                  className="grid grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto w-full px-4"
                >
                  {slide.stats.map((stat, statIndex) => (
                    <StatCard key={`${index}-${statIndex}-${stat.label}`} {...stat} />
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Auto-play control */}
      <button
        onClick={() => setIsPaused((pv) => !pv)}
        className="absolute bottom-4 right-4 p-3 rounded-full bg-black/50 text-white/75 backdrop-blur-lg border border-white/10 hover:bg-black/70 transition-colors z-30"
      >
        {isPaused ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default Hero;