import React from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Gamepad2, Trophy, Flame, TrendingUp, Star, ChevronRight, ChevronLeft } from 'lucide-react';

const blogPosts = [
  {
    title: "Epic Jackpot Saga",
    excerpt: "From $10 to $1M: The Story That Shocked Vegas",
    image: "/0.jpg",
    category: "Legendary Wins",
    icon: Trophy,
    date: "12 Hours Ago",
    stats: {
      winAmount: "$1,000,000",
      gamePlayed: "Fortune Tiger",
      multiplier: "10,000x"
    },
    gradient: "from-yellow-400 via-amber-300 to-orange-400"
  },
  {
    title: "Neon Dynasty Arrives",
    excerpt: "Enter the Cyberpunk Realm of Future Slots",
    image: "/1.jpg",
    category: "Game Launch",
    icon: Gamepad2,
    date: "2 Days Ago",
    stats: {
      maxWin: "50,000x",
      volatility: "Extreme",
      features: "15"
    },
    gradient: "from-purple-400 via-pink-300 to-red-400"
  },
  {
    title: "Master the Matrix",
    excerpt: "AI Reveals Patterns in Chaos Theory Gaming",
    image: "/2.jpg",
    category: "Neural Edge",
    icon: TrendingUp,
    date: "3 Days Ago",
    stats: {
      winRate: "97.5%",
      complexity: "Advanced",
      potential: "∞"
    },
    gradient: "from-blue-400 via-cyan-300 to-teal-400"
  },
  {
    title: "Million Dollar Rush",
    excerpt: "Global Tournament with Live Tracking",
    image: "/3.jpg",
    category: "Live Event",
    icon: Flame,
    date: "Starting Soon",
    stats: {
      prizePool: "$2.5M",
      players: "10,000+",
      duration: "24h"
    },
    gradient: "from-red-400 via-orange-300 to-yellow-400"
  }
];

const BlogSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const controls = useAnimation();
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoplayEnabled && !isHovering) {
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % blogPosts.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoplayEnabled, isHovering]);

  if (!mounted) {
    return null; 
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % blogPosts.length);
    setAutoplayEnabled(false);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + blogPosts.length) % blogPosts.length);
    setAutoplayEnabled(false);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-black/90">
      {/* Animated Cyber Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#FFB00022_1px,transparent_1px),linear-gradient(to_bottom,#FFB00022_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,rgba(255,176,0,0.1),transparent)]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative"
        >
          <div className="inline-block">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-8 -left-8 w-16 h-16 border-2 border-dashed border-[#FFB000]/30 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -left-4 w-8 h-8 border-2 border-dashed border-[#FFB000]/40 rounded-full"
            />
            <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-[#FFB000] via-[#FFCF9D] to-[#FFB000] bg-clip-text text-transparent relative">
              Chronicles of Fortune
            </h2>
          </div>
          <p className="text-[#FFCF9D]/80 text-xl">
            Where Every Story is a New Adventure
          </p>
        </motion.div>

        <div className="relative"
             onMouseEnter={() => setIsHovering(true)}
             onMouseLeave={() => setIsHovering(false)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl overflow-hidden"
            >
              <div className="aspect-[21/9] relative">
                <Image
                  src={blogPosts[activeIndex].image}
                  alt={blogPosts[activeIndex].title}
                  fill
                  priority={activeIndex === 0}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-end p-8 md:p-12">
                  <div className="w-full">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col gap-4"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r ${blogPosts[activeIndex].gradient} text-black/80`}>
                          <div className="flex items-center gap-2">
                            {React.createElement(blogPosts[activeIndex].icon, { size: 16 })}
                            <span>{blogPosts[activeIndex].category}</span>
                          </div>
                        </div>
                        <span className="text-[#FFCF9D]/80">{blogPosts[activeIndex].date}</span>
                      </div>
                      
                      <h3 className="text-4xl md:text-5xl font-black text-white mb-6">
                        {blogPosts[activeIndex].title}
                      </h3>
                      
                      <p className="text-xl text-[#FFCF9D]/90 max-w-2xl mb-8">
                        {blogPosts[activeIndex].excerpt}
                      </p>
                      
                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        {Object.entries(blogPosts[activeIndex].stats).map(([key, value], idx) => (
                          <div key={key} className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                            <div className="text-sm text-[#FFCF9D]/60 mb-1">{key}</div>
                            <div className="text-lg font-bold text-[#FFB000]">{value}</div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/80 hover:bg-black/70 transition-all pointer-events-auto"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/80 hover:bg-black/70 transition-all pointer-events-auto"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Progress Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {blogPosts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveIndex(idx);
                  setAutoplayEnabled(false);
                }}
                className={`w-16 h-1 rounded-full transition-all ${
                  idx === activeIndex
                    ? 'bg-gradient-to-r from-[#FFB000] to-[#FFCF9D]'
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <button className="group relative px-8 py-4 rounded-xl bg-black border border-[#FFB000]/20 hover:border-[#FFB000]/40 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFB000]/0 via-[#FFB000]/10 to-[#FFB000]/0 group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
            <span className="relative font-bold text-lg bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] bg-clip-text text-transparent">
              Explore All Chronicles
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
