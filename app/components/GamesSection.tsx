'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Coins, Diamond, Crown, Flame, Sparkles, Zap, Timer, Info } from 'lucide-react';

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
    category: 'crypto'
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
      {/* Floating Elements */}
      <AnimatePresence>
        {isHovered && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -top-4 -right-4 bg-[#FFB000] text-black text-sm font-bold px-3 py-1 rounded-full z-20 flex items-center gap-2"
            >
              <Flame className="w-4 h-4" />
              {game.popularity}% Hot
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute -left-2 top-1/2 -translate-y-1/2 bg-[#FFB000]/20 backdrop-blur-sm text-[#FFCF9D] p-2 rounded-lg z-20"
            >
              <div className="flex flex-col gap-2">
                {game.features.map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span className="text-xs">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Card */}
      <motion.div
        whileHover={{
          rotateY: 10,
          rotateX: 5,
          scale: 1.05,
          z: 50
        }}
        className="relative bg-[#1A1A1A] rounded-2xl overflow-hidden transform-gpu preserve-3d shadow-2xl border border-[#FFB000]/20 group-hover:border-[#FFB000]/40"
      >
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
            className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-[#FFB000] text-black text-sm font-bold"
          >
            {game.provider}
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] bg-clip-text text-transparent">
            {game.title}
          </h3>
          <p className="text-[#FFCF9D]/70 mb-4 line-clamp-2">{game.description}</p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {game.stats.map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1 }}
                className="text-center"
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-gradient-to-r from-[#FFB000]/20 to-[#FFCF9D]/20 flex items-center justify-center">
                  {stat.icon}
                </div>
                <div className="text-sm font-bold text-[#FFCF9D]">{stat.value}</div>
                <div className="text-xs text-[#FFCF9D]/50">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Buttons Container */}
          <div className="flex items-center justify-center gap-4 mt-6">
            {/* Play Button */}
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
                    <Zap className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="absolute inset-0 bg-white/20 blur-sm rounded-lg"></span>
                  </span>
                  <span className="relative">
                    <span className="absolute -inset-1 bg-white/20 blur-sm rounded-lg"></span>
                    <span className="relative">PLAY NOW</span>
                  </span>
                </span>
              </div>
            </motion.button>

            {/* Info Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              className="p-2 rounded-lg bg-black/30 backdrop-blur-sm border border-white/10 text-white/90 hover:bg-black/40 transition-colors"
            >
              <Info className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const GamesSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<Game['category'] | 'all'>('all');

  const categories = [
    { id: 'all', label: 'All Games', icon: <Sparkles className="w-5 h-5" /> },
    { id: 'slots', label: 'Slots', icon: <Diamond className="w-5 h-5" /> },
    { id: 'table', label: 'Table Games', icon: <Crown className="w-5 h-5" /> },
    { id: 'live', label: 'Live Casino', icon: <Zap className="w-5 h-5" /> },
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
        
        {/* Animated Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#FFB000]"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0,
              opacity: 0 
            }}
            animate={{ 
              y: [null, Math.random() * -500],
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0]
            }}
            transition={{ 
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="relative container mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl font-bold bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] bg-clip-text text-transparent mb-8">
            Featured Games
          </h2>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id as Game['category'] | 'all')}
                className={`px-6 py-3 rounded-xl flex items-center gap-2 transition-all ${
                  selectedCategory === category.id
                    ? 'bg-[#FFB000] text-black font-bold'
                    : 'bg-[#FFB000]/20 text-[#FFCF9D] hover:bg-[#FFB000]/30'
                }`}
              >
                {category.icon}
                {category.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredGames.map((game, index) => (
              <GameCard key={game.title} game={game} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default GamesSection;
