'use client';
import React, { useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { ArrowUpRight, TrendingUp, Users, Clock, Coins, Diamond, Crown, ChevronDown, Plus, Sparkles, Trophy, Award, Gift, Zap, Star, Flame, Shield, Lock, Heart, Mail, CreditCard, Wallet, Bitcoin } from 'lucide-react';
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

const DashboardPage = () => {
  const [visibleGames, setVisibleGames] = useState(6);

  const handleShowMore = () => {
    setVisibleGames(prev => Math.min(prev + 6, games.length));
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen pb-12 mt-5">
        <div className="space-y-8 sm:space-y-12 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop/Tablet Stats Grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const gradients = [
                'from-rose-500/20 via-purple-500/20 to-indigo-500/20',
                'from-amber-500/20 via-orange-500/20 to-red-500/20',
                'from-emerald-500/20 via-teal-500/20 to-cyan-500/20',
                'from-blue-500/20 via-violet-500/20 to-purple-500/20'
              ];
              const glowColors = [
                'group-hover:shadow-purple-500/30',
                'group-hover:shadow-orange-500/30',
                'group-hover:shadow-teal-500/30',
                'group-hover:shadow-violet-500/30'
              ];
              const iconColors = [
                'text-purple-400 group-hover:text-purple-300',
                'text-orange-400 group-hover:text-orange-300',
                'text-teal-400 group-hover:text-teal-300',
                'text-violet-400 group-hover:text-violet-300'
              ];
              return (
                <div 
                  key={stat.label}
                  className={`group relative rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5`}
                >
                  {/* Background Glow */}
                  <div className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r ${gradients[index]} opacity-0 group-hover:opacity-100 blur-xl transition-all duration-300`} />
                  
                  {/* Main Card */}
                  <div className={`relative bg-white/[0.03] rounded-2xl p-6 h-full border border-white/10 backdrop-blur-sm shadow-lg transition-shadow duration-300 ${glowColors[index]}`}>
                    {/* Decorative Elements */}
                    <div className="absolute inset-0 rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-[0.02] transition-opacity duration-300 group-hover:opacity-[0.04]" />
                      <div className={`absolute -right-20 -top-20 w-40 h-40 rounded-full bg-gradient-to-r ${gradients[index]} blur-3xl opacity-20 transition-opacity duration-300 group-hover:opacity-30`} />
                      <div className={`absolute -left-20 -bottom-20 w-40 h-40 rounded-full bg-gradient-to-r ${gradients[index]} blur-3xl opacity-20 transition-opacity duration-300 group-hover:opacity-30`} />
                    </div>

                    {/* Content */}
                    <div className="relative flex flex-col h-full">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-400 font-medium">{stat.label}</span>
                        <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[10deg]`}>
                          <Icon className={`w-5 h-5 transition-colors duration-300 ${iconColors[index]}`} />
                        </div>
                      </div>
                      
                      <div className="flex items-end justify-between mt-auto">
                        <div className="space-y-1">
                          <h4 className="text-2xl font-bold text-white group-hover:scale-105 transition-transform origin-left">
                            {stat.value}
                          </h4>
                          <div className="flex items-center gap-1">
                            <span className={`text-xs font-semibold ${iconColors[index]}`}>
                              {stat.change}
                            </span>
                            <span className="text-xs text-gray-500">vs last month</span>
                          </div>
                        </div>
                        
                        {/* Mini Graph */}
                        <div className="flex items-end gap-0.5 h-6">
                          {[0.3, 0.5, 0.4, 0.7, 0.6, 0.8, 0.9].map((height, i) => (
                            <div
                              key={i}
                              style={{
                                height: `${height * 100}%`,
                                transitionDelay: `${i * 50}ms`
                              }}
                              className={`w-1 rounded-full bg-gradient-to-t ${gradients[index]} group-hover:scale-y-110 transition-transform origin-bottom`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Mobile Stats Grid - 2 rows */}
          <div className="grid sm:hidden grid-cols-2 gap-3">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const gradients = [
                'from-rose-500/20 via-purple-500/20 to-indigo-500/20',
                'from-amber-500/20 via-orange-500/20 to-red-500/20',
                'from-emerald-500/20 via-teal-500/20 to-cyan-500/20',
                'from-blue-500/20 via-violet-500/20 to-purple-500/20'
              ];
              const iconColors = [
                'text-purple-400',
                'text-orange-400',
                'text-teal-400',
                'text-violet-400'
              ];
              return (
                <div 
                  key={stat.label} 
                  className="group relative bg-white/[0.03] p-3 rounded-xl border border-white/10"
                >
                  <div className={`absolute -inset-0.5 rounded-xl bg-gradient-to-r ${gradients[index]} opacity-0 group-hover:opacity-100 blur-lg transition-all duration-300`} />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[10deg]`}>
                        <Icon className={`w-4 h-4 ${iconColors[index]}`} />
                      </div>
                      <span className={`text-xs font-medium ${iconColors[index]}`}>{stat.change}</span>
                    </div>
                    <p className="text-xs text-gray-400">{stat.label}</p>
                    <p className="text-base font-semibold text-white mt-0.5 group-hover:scale-105 transition-transform origin-left">
                      {stat.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 sm:mt-12">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-white/5 p-4 sm:p-6 lg:p-8 rounded-xl border border-white/10 h-full">
                <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  {[
                    {
                      type: 'jackpot',
                      game: 'Golden Dragon',
                      amount: '+$1,250',
                      time: '2 hours ago',
                      image: '/1.jpg',
                      details: 'Hit the Mega Jackpot!',
                      color: 'from-yellow-500 to-amber-600',
                      multiplier: '50x'
                    },
                    {
                      type: 'tournament',
                      game: 'Fire Kirin',
                      amount: '+$500',
                      time: '5 hours ago',
                      image: '/2.jpg',
                      details: '1st Place in Daily Tournament',
                      color: 'from-blue-500 to-cyan-600',
                      participants: 128
                    },
                    {
                      type: 'achievement',
                      game: 'Ultra Panda',
                      amount: '+$100',
                      time: '12 hours ago',
                      image: '/3.jpg',
                      details: 'Lucky Streak: 7 Wins',
                      color: 'from-purple-500 to-indigo-600',
                      xp: 500
                    },
                    {
                      type: 'bonus',
                      game: 'Panda Master',
                      amount: '+$75',
                      time: '1 day ago',
                      image: '/5.jpg',
                      details: 'Daily Spin Reward',
                      color: 'from-green-500 to-emerald-600',
                      streak: 5
                    }
                  ].map((activity, index) => (
                    <div 
                      key={index} 
                      className="relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                           style={{ backgroundImage: `linear-gradient(to right, ${activity.color})` }} />
                      
                      <div className="relative flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                        <div className="relative flex-shrink-0">
                          <div className="w-12 h-12 rounded-lg overflow-hidden">
                            <Image
                              src={activity.image}
                              alt={activity.game}
                              width={48}
                              height={48}
                              className="object-cover"
                            />
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r ${activity.color} flex items-center justify-center shadow-lg`}>
                            {activity.type === 'jackpot' && <Sparkles className="w-3 h-3 text-white" />}
                            {activity.type === 'tournament' && <Trophy className="w-3 h-3 text-white" />}
                            {activity.type === 'achievement' && <Award className="w-3 h-3 text-white" />}
                            {activity.type === 'bonus' && <Gift className="w-3 h-3 text-white" />}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-white truncate">
                                {activity.game}
                              </span>
                              <span className={`px-2 py-0.5 rounded-full text-xs bg-gradient-to-r ${activity.color} text-white`}>
                                {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                              </span>
                            </div>
                            <span className={`text-sm font-bold ${
                              activity.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {activity.amount}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-400">{activity.details}</div>
                            <div className="text-xs text-gray-500">{activity.time}</div>
                          </div>

                          <div className="mt-2 flex items-center gap-3">
                            {activity.multiplier && (
                              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-[#FFCF9D]">
                                <Zap className="w-3 h-3" />
                                {activity.multiplier} Multiplier
                              </span>
                            )}
                            {activity.participants && (
                              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-[#FFCF9D]">
                                <Users className="w-3 h-3" />
                                {activity.participants} Players
                              </span>
                            )}
                            {activity.xp && (
                              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-[#FFCF9D]">
                                <Star className="w-3 h-3" />
                                +{activity.xp} XP
                              </span>
                            )}
                            {activity.streak && (
                              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-[#FFCF9D]">
                                <Flame className="w-3 h-3" />
                                {activity.streak} Day Streak
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 p-4 sm:p-6 lg:p-8 rounded-xl border border-white/10 h-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-white">Popular Games</h2>
                  <span className="text-sm text-gray-400">{visibleGames} of {games.length} games</span>
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
        </div>

        <div className="mt-8 sm:mt-12">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/5 p-4 sm:p-6 lg:p-8 rounded-xl border border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-white">Your Added Games</h2>
                <Link 
                  href="/dashboard/add-game"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 rounded-lg text-sm text-white font-medium transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add a New Game
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                {[
                  {
                    name: 'Golden Dragon',
                    balance: 0,
                    gameId: 'M-436-343-056',
                    entries: 0,
                    image: '/1.jpg',
                    status: 'Active'
                  },
                  {
                    name: 'Fire Kirin',
                    balance: 0,
                    gameId: 'FK_aminof235',
                    image: '/2.jpg',
                    status: 'Active'
                  },
                  {
                    name: 'Ultra Panda',
                    balance: 0,
                    gameId: 'aminofabUP777',
                    safe: 0,
                    image: '/3.jpg',
                    status: 'Active'
                  },
                  {
                    name: 'Panda Master',
                    balance: 0,
                    gameId: 'PM_aminofa235',
                    image: '/5.jpg',
                    status: 'Active'
                  }
                ].map((game, index) => (
                  <div key={index} className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                    <div className="relative h-32 sm:h-40">
                      <Image
                        src={game.image}
                        alt={game.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                      <div className="absolute top-3 right-3 px-2 py-1 bg-green-500/20 rounded-full">
                        <span className="text-xs text-green-400">{game.status}</span>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{game.name}</h3>
                          <div className="text-2xl font-bold text-green-400 mt-1">$ {game.balance}</div>
                        </div>
                        {(game.entries !== undefined || game.safe !== undefined) && (
                          <div className="text-right">
                            <span className="text-sm text-gray-400">
                              {game.entries !== undefined ? 'Entries' : 'Safe'}:
                            </span>
                            <div className="text-lg font-semibold text-white">
                              {game.entries !== undefined ? game.entries : game.safe}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center">
                            <Crown className="w-3 h-3 text-purple-500" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm text-gray-400">Game ID:</div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-white font-medium">{game.gameId}</span>
                              <button 
                                onClick={() => navigator.clipboard.writeText(game.gameId)}
                                className="text-xs text-purple-400 hover:text-purple-300"
                              >
                                Copy
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-xs text-gray-400 italic">
                          (Password will only be sent or visualized on your email)
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          <button className="flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white transition-colors">
                            <Coins className="w-4 h-4" />
                            <span>Add Credits</span>
                          </button>
                          <button className="flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white transition-colors">
                            <ArrowUpRight className="w-4 h-4" />
                            <span>Withdraw</span>
                          </button>
                          <button className="flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white transition-colors">
                            <Clock className="w-4 h-4" />
                            <span>Reset Password</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <button className="flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white transition-colors">
                            <TrendingUp className="w-4 h-4" />
                            <span>Refresh Balance</span>
                          </button>
                          <button className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 rounded-lg text-sm text-white transition-colors">
                            <Diamond className="w-4 h-4" />
                            <span>Play Now</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 border-t border-white/10">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white">Responsible Gaming</h3>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-xs text-gray-400">Licensed & Regulated Gaming</span>
                </div>
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-blue-400" />
                  <span className="text-xs text-gray-400">Secure Transactions</span>
                </div>
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-red-400" />
                  <span className="text-xs text-gray-400">Play Responsibly</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white">Support</h3>
                <div className="space-y-2">
                  <Link href="/help" className="block text-xs text-gray-400 hover:text-white transition-colors">
                    24/7 Customer Support
                  </Link>
                  <Link href="/faq" className="block text-xs text-gray-400 hover:text-white transition-colors">
                    FAQ
                  </Link>
                  <Link href="/contact" className="block text-xs text-gray-400 hover:text-white transition-colors">
                    Contact Us
                  </Link>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Mail className="w-4 h-4" />
                    support@slotthing.com
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white">Legal</h3>
                <div className="space-y-2">
                  <Link href="/terms" className="block text-xs text-gray-400 hover:text-white transition-colors">
                    Terms & Conditions
                  </Link>
                  <Link href="/privacy" className="block text-xs text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                  <Link href="/aml" className="block text-xs text-gray-400 hover:text-white transition-colors">
                    AML Policy
                  </Link>
                  <Link href="/kyc" className="block text-xs text-gray-400 hover:text-white transition-colors">
                    KYC Requirements
                  </Link>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white">Game Providers</h3>
                <div className="grid grid-cols-3 gap-2">
                  {['Pragmatic Play', 'NetEnt', 'Microgaming', 'Playtech', 'Evolution', 'Yggdrasil'].map((provider) => (
                    <div 
                      key={provider}
                      className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400 text-center"
                    >
                      {provider}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-xs text-gray-500">Payment Methods:</span>
                  <div className="flex gap-2">
                    <CreditCard className="w-4 h-4 text-gray-400" />
                    <Wallet className="w-4 h-4 text-gray-400" />
                    <Bitcoin className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <Image
                    src="/111.png"
                    alt="SlotThing"
                    width={32}
                    height={32}
                    className="rounded-lg"
                  />
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span> 2025 SlotThing</span>
                    <span>•</span>
                    <span>All Rights Reserved</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">Age Restriction:</span>
                  <div className="px-2 py-1 bg-red-500/10 rounded">
                    <span className="text-xs font-medium text-red-400">18+</span>
                  </div>
                  <div className="w-px h-4 bg-white/10" />
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-gray-500">Licensed Casino</span>
                </div>
              </div>
            </div>

            <div className="mt-8 text-xs text-gray-600 leading-relaxed max-w-3xl">
              Gambling can be addictive. Please play responsibly. If you feel you may have a gambling problem, contact the National Problem Gambling Helpline at 1-800-522-4700 for confidential help.
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
