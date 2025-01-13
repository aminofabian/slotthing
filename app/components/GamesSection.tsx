'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Coins, Diamond, Crown, Flame, Sparkles, Zap, Timer, Info, Star } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface Game {
  title: string;
  description: string;
  imageUrl: string;
  provider: string;
  stats: {
    icon: React.ReactNode;
    value: string;
    label: string;
  }[];
  features: string[];
  popularity: number;
  category: 'slots' | 'table' | 'live' | 'crypto';
  color?: string;
}

const games: Game[] = [
  {
    title: "Panda Master",
    description: "Experience the mystical world of pandas in this enchanting game",
    imageUrl: "/1.jpg",
    provider: "Premium",
    stats: [
      { icon: <Coins className="w-5 h-5 text-[#FFCF9D]" />, value: "96.5%", label: "RTP" },
      { icon: <Diamond className="w-5 h-5 text-[#FFCF9D]" />, value: "$50K", label: "Max Win" },
      { icon: <Crown className="w-5 h-5 text-[#FFCF9D]" />, value: "High", label: "Volatility" },
    ],
    features: ["Multiplier Wilds", "Free Spins", "Bonus Game"],
    popularity: 98,
    category: 'slots'
  },
  {
    title: "Dragon's Fortune",
    description: "Unleash the power of ancient dragons in this epic slot adventure",
    imageUrl: "/2.jpg",
    provider: "Featured",
    stats: [
      { icon: <Coins className="w-5 h-5 text-[#FFCF9D]" />, value: "97.2%", label: "RTP" },
      { icon: <Diamond className="w-5 h-5 text-[#FFCF9D]" />, value: "$100K", label: "Max Win" },
      { icon: <Crown className="w-5 h-5 text-[#FFCF9D]" />, value: "Medium", label: "Volatility" },
    ],
    features: ["Dragon Respins", "Progressive Jackpot", "Mystery Symbols"],
    popularity: 95,
    category: 'slots'
  },
  {
    title: "Cosmic Spins",
    description: "Journey through the cosmos for out-of-this-world wins",
    imageUrl: "/3.jpg",
    provider: "Popular",
    stats: [
      { icon: <Coins className="w-5 h-5 text-[#FFCF9D]" />, value: "96.8%", label: "RTP" },
      { icon: <Diamond className="w-5 h-5 text-[#FFCF9D]" />, value: "$75K", label: "Max Win" },
      { icon: <Crown className="w-5 h-5 text-[#FFCF9D]" />, value: "High", label: "Volatility" },
    ],
    features: ["Expanding Reels", "Cosmic Wilds", "Supernova Bonus"],
    popularity: 92,
    category: 'slots'
  },
  {
    title: "Golden Pharaoh",
    description: "Uncover ancient Egyptian treasures in this golden adventure",
    imageUrl: "/4.png",
    provider: "New",
    stats: [
      { icon: <Coins className="w-5 h-5 text-[#FFCF9D]" />, value: "96.5%", label: "RTP" },
      { icon: <Diamond className="w-5 h-5 text-[#FFCF9D]" />, value: "$50K", label: "Max Win" },
      { icon: <Crown className="w-5 h-5 text-[#FFCF9D]" />, value: "High", label: "Volatility" },
    ],
    features: ["Pyramid Bonus", "Scarab Wilds", "Tomb Explorer"],
    popularity: 88,
    category: 'slots'
  },
  {
    title: "Lucky Fortune",
    description: "Where luck meets fortune in this Asian-inspired masterpiece",
    imageUrl: "/5.jpg",
    provider: "Featured",
    stats: [
      { icon: <Coins className="w-5 h-5 text-[#FFCF9D]" />, value: "97.2%", label: "RTP" },
      { icon: <Diamond className="w-5 h-5 text-[#FFCF9D]" />, value: "$100K", label: "Max Win" },
      { icon: <Crown className="w-5 h-5 text-[#FFCF9D]" />, value: "Medium", label: "Volatility" },
    ],
    features: ["Fortune Wheel", "Lucky Coins", "Dragon Dance"],
    popularity: 94,
    category: 'slots'
  },
  {
    title: "Crypto Miners",
    description: "Mine your way to crypto riches in this blockchain-themed slot",
    imageUrl: "/images/faq/2.jpg",
    provider: "Premium",
    stats: [
      { icon: <Coins className="w-5 h-5 text-[#FFCF9D]" />, value: "96.8%", label: "RTP" },
      { icon: <Diamond className="w-5 h-5 text-[#FFCF9D]" />, value: "$75K", label: "Max Win" },
      { icon: <Crown className="w-5 h-5 text-[#FFCF9D]" />, value: "High", label: "Volatility" },
    ],
    features: ["Bitcoin Bonus", "Blockchain Wilds", "Mining Multipliers"],
    popularity: 96,
    category: 'crypto',
    color: '#34C759'
  }
];

const GameCard = ({ game, index }: { game: Game; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group perspective-1000"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Slot Machine Decorative Elements */}
      <AnimatePresence>
        {isHovered && (
          <>
            {/* Popularity Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -top-4 -right-4 z-20"
            >
              <div className="relative">
                <div className="w-20 h-20">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="#FFB000"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: game.popularity / 100 }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-[#FFB000] text-black text-sm font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      {game.popularity}%
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-20"
            >
              <div className="bg-[#1A1A1A]/90 backdrop-blur-xl border-2 border-[#FFB000]/20 rounded-xl p-3">
                <div className="flex flex-col gap-2">
                  {game.features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2 group/feature"
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="text-[#FFB000]"
                      >
                        <Sparkles className="w-4 h-4" />
                      </motion.div>
                      <span className="text-sm text-[#FFCF9D] group-hover/feature:text-[#FFB000] transition-colors">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Card */}
      <motion.div
        whileHover={{
          rotateY: 15,
          rotateX: 5,
          scale: 1.05,
          z: 50
        }}
        className="relative bg-[#1A1A1A]/80 backdrop-blur-xl rounded-2xl overflow-hidden transform-gpu preserve-3d shadow-2xl border-2 border-[#FFB000]/20 group-hover:border-[#FFB000]/40"
      >
        {/* Slot Machine Frame */}
        <div className="absolute inset-0 rounded-2xl border-8 border-[#FFB000]/5" />
        
        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-100%]"
          animate={isHovered ? {
            translateX: ['100%']
          } : {}}
          transition={{
            duration: 0.8,
            ease: "easeInOut"
          }}
        />

        {/* Game Image */}
        <div className="relative h-48">
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent z-10" />
          <Image
            src={game.imageUrl}
            alt={game.title}
            fill
            className="object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          {/* Provider Badge */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="absolute top-4 left-4 z-20"
          >
            <div className="bg-[#FFB000] text-black text-sm font-bold px-4 py-2 rounded-full flex items-center gap-2">
              <Crown className="w-4 h-4" />
              {game.provider}
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 relative">
          <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] bg-clip-text text-transparent">
            {game.title}
          </h3>
          <p className="text-[#FFCF9D]/70 mb-4 line-clamp-2">{game.description}</p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            {game.stats.map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1 }}
                className="relative group/stat"
              >
                <div className="bg-[#1A1A1A] rounded-xl p-3 border border-[#FFB000]/20 group-hover/stat:border-[#FFB000]/40">
                  <div className="flex flex-col items-center gap-1">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                      className="text-[#FFB000]"
                    >
                      {stat.icon}
                    </motion.div>
                    <span className="text-lg font-bold text-[#FFCF9D]">{stat.value}</span>
                    <span className="text-xs text-[#FFCF9D]/70">{stat.label}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Play Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full mt-6 bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 group/play"
          >
            <span>Play Now</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Zap className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </div>

        {/* Background Glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at center, ${game.color || '#FFB000'}40 0%, transparent 70%)`
          }}
        />

        {/* Slot Machine Light Effects */}
        {isHovered && (
          <>
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[#FFB000]/50 to-transparent" />
            <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-[#FFB000]/50 to-transparent" />
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

const GamesSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<Game['category'] | 'all'>('all');
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();

  const categories = [
    { id: 'all', label: 'All Games', icon: <Trophy className="w-5 h-5" /> },
    { id: 'slots', label: 'Slot Games', icon: <Zap className="w-5 h-5" /> },
    { id: 'table', label: 'Table Games', icon: <Diamond className="w-5 h-5" /> },
    { id: 'live', label: 'Live Casino', icon: <Crown className="w-5 h-5" /> },
    { id: 'crypto', label: 'Crypto Games', icon: <Coins className="w-5 h-5" /> },
  ];

  const filteredGames = games.filter(game => 
    selectedCategory === 'all' ? true : game.category === selectedCategory
  );

  return (
    <section className="relative py-32 overflow-hidden bg-[#0E0E0E]">
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
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
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

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="relative inline-block">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] bg-clip-text text-transparent mb-4">
              Jackpot Games 🎰
            </h2>
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
              <Star className="w-8 h-8 text-[#FFB000]" />
            </motion.div>
          </div>
          <p className="text-[#FFCF9D]/70 text-lg max-w-2xl mx-auto">
            Hit the jackpot with our collection of thrilling casino games! 💎
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as Game['category'] | 'all')}
              className={`relative px-6 py-3 rounded-xl flex items-center gap-2 group overflow-hidden ${
                selectedCategory === category.id 
                ? 'bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] text-black' 
                : 'bg-[#1A1A1A]/50 text-[#FFCF9D] hover:bg-[#1A1A1A]/70'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`${selectedCategory === category.id ? 'text-black' : 'text-[#FFB000]'}`}>
                {category.icon}
              </div>
              <span className="font-bold">{category.label}</span>
              {selectedCategory === category.id && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] -z-10"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Games Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredGames.map((game, index) => (
              <GameCard key={game.title} game={game} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Spotlight Effect */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-transparent to-[#0E0E0E] opacity-60" />
      </div>
    </section>
  );
};

export default GamesSection;
