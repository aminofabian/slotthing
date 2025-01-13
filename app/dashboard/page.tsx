'use client';
import React, { useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { ArrowUpRight, TrendingUp, Users, Clock, Coins, Diamond, Crown, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
    imageUrl: "/6.jpg",
    provider: "Premium",
    stats: [
      { icon: <Coins className="w-5 h-5 text-[#FFCF9D]" />, value: "96.8%", label: "RTP" },
      { icon: <Diamond className="w-5 h-5 text-[#FFCF9D]" />, value: "$75K", label: "Max Win" },
      { icon: <Crown className="w-5 h-5 text-[#FFCF9D]" />, value: "High", label: "Volatility" },
    ],
    features: ["Bitcoin Bonus", "Blockchain Wilds", "Mining Multipliers"],
    popularity: 96,
    category: 'crypto'
  },
  {
    title: "Mystic Roulette",
    description: "Experience the thrill of mystical roulette with enchanted multipliers",
    imageUrl: "/7.jpg",
    provider: "Premium",
    stats: [
      { icon: <Coins className="w-5 h-5 text-[#FFCF9D]" />, value: "97.3%", label: "RTP" },
      { icon: <Diamond className="w-5 h-5 text-[#FFCF9D]" />, value: "$200K", label: "Max Win" },
      { icon: <Crown className="w-5 h-5 text-[#FFCF9D]" />, value: "Medium", label: "Volatility" },
    ],
    features: ["Mystic Multipliers", "Bonus Wheel", "Progressive Jackpot"],
    popularity: 97,
    category: 'table'
  },
  {
    title: "Diamond Rush",
    description: "Chase sparkling diamonds in this high-stakes adventure",
    imageUrl: "/8.jpg",
    provider: "Featured",
    stats: [
      { icon: <Coins className="w-5 h-5 text-[#FFCF9D]" />, value: "96.9%", label: "RTP" },
      { icon: <Diamond className="w-5 h-5 text-[#FFCF9D]" />, value: "$150K", label: "Max Win" },
      { icon: <Crown className="w-5 h-5 text-[#FFCF9D]" />, value: "High", label: "Volatility" },
    ],
    features: ["Diamond Cascade", "Gem Collector", "Crystal Bonus"],
    popularity: 93,
    category: 'slots'
  },
  {
    title: "Live Blackjack Pro",
    description: "Elite live blackjack experience with professional dealers",
    imageUrl: "/9.jpg",
    provider: "Premium",
    stats: [
      { icon: <Coins className="w-5 h-5 text-[#FFCF9D]" />, value: "99.5%", label: "RTP" },
      { icon: <Diamond className="w-5 h-5 text-[#FFCF9D]" />, value: "$100K", label: "Max Win" },
      { icon: <Crown className="w-5 h-5 text-[#FFCF9D]" />, value: "Low", label: "Volatility" },
    ],
    features: ["Live Dealers", "Multi-Hand Play", "VIP Tables"],
    popularity: 96,
    category: 'live'
  },
  {
    title: "Aztec Treasures",
    description: "Discover ancient Aztec riches in this mystical adventure",
    imageUrl: "/10.jpg",
    provider: "New",
    stats: [
      { icon: <Coins className="w-5 h-5 text-[#FFCF9D]" />, value: "96.7%", label: "RTP" },
      { icon: <Diamond className="w-5 h-5 text-[#FFCF9D]" />, value: "$80K", label: "Max Win" },
      { icon: <Crown className="w-5 h-5 text-[#FFCF9D]" />, value: "High", label: "Volatility" },
    ],
    features: ["Temple Bonus", "Aztec Calendar", "Golden Masks"],
    popularity: 91,
    category: 'slots'
  }
];

const DashboardPage = () => {
  const [visibleGames, setVisibleGames] = useState(6);
  const stats = [
    {
      label: 'Total Winnings',
      value: '$2,450',
      change: '+12.5%',
      icon: ArrowUpRight,
    },
    {
      label: 'Active Games',
      value: '24',
      change: '+4.1%',
      icon: TrendingUp,
    },
    {
      label: 'Total Players',
      value: '12.5K',
      change: '+8.2%',
      icon: Users,
    },
    {
      label: 'Time Played',
      value: '142h',
      change: '+10.3%',
      icon: Clock,
    },
  ];

  const handleShowMore = () => {
    setVisibleGames(prev => Math.min(prev + 6, games.length));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl sm:text-2xl font-bold text-white">Dashboard Overview</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white/5 p-4 sm:p-6 rounded-xl border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-400">{stat.label}</p>
                    <p className="text-lg sm:text-2xl font-semibold text-white mt-1">{stat.value}</p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
                  </div>
                </div>
                <div className="mt-3 sm:mt-4">
                  <span className="text-xs sm:text-sm font-medium text-green-400">
                    {stat.change}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 ml-2">vs last month</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white/5 p-4 sm:p-6 rounded-xl border border-white/10">
            <h2 className="text-base sm:text-lg font-semibold text-white mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {/* Add recent activity items here */}
            </div>
          </div>

          <div className="bg-white/5 p-4 sm:p-6 rounded-xl border border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-2 sm:space-y-0">
              <h2 className="text-base sm:text-lg font-semibold text-white">Popular Games</h2>
              <span className="text-xs sm:text-sm text-gray-400">{visibleGames} of {games.length} games</span>
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {games.slice(0, visibleGames).map((game) => (
                <Link 
                  href={`/play/${game.title.toLowerCase().replace(/\s+/g, '-')}`}
                  key={game.title}
                  className="group relative block"
                >
                  <div className="aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                      src={game.imageUrl}
                      alt={game.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
                    <h3 className="text-xs sm:text-sm font-semibold text-white truncate">{game.title}</h3>
                    <div className="flex items-center gap-2 mt-0.5 sm:mt-1">
                      <span className="text-[10px] sm:text-xs text-gray-300">{game.provider}</span>
                      <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-[#FFCF9D]">
                        <Crown className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        {game.stats[2].value}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {visibleGames < games.length && (
              <button
                onClick={handleShowMore}
                className="mt-4 sm:mt-6 w-full py-2.5 sm:py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm sm:text-base text-white font-medium flex items-center justify-center gap-2 transition-colors"
              >
                Show More Games
                <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
