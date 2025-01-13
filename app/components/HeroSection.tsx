'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Bitcoin, Timer, Trophy, Sparkles, Coins, Gift, Zap, Crown, Flame, Users } from 'lucide-react';
import { ChipIcon } from './icons/ChipIcon';
import { useTheme } from '../context/ThemeContext';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactElement;
  gradient: string;
}

interface WinnerCardProps {
  username: string;
  game: string;
  amount: string;
  timeAgo: string;
  multiplier: string;
}

const WinnerCard = ({ username, game, amount, timeAgo, multiplier }: WinnerCardProps) => {
  const { theme } = useTheme();
  
  return (
    <div className="group relative">
      {/* Background blur effect */}
      <div className="absolute inset-0 rounded-xl transition-transform duration-300 group-hover:scale-105">
        <div className={`absolute inset-0 rounded-xl transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-secondary-800/50 border border-secondary-700'
            : 'bg-white shadow-lg border border-secondary-200'
        }`}></div>
        <div className={`absolute bottom-0 left-0 w-full h-1/2 rounded-b-xl ${
          theme === 'dark'
            ? 'bg-gradient-to-t from-secondary-900/20 to-transparent opacity-20 blur-xl transition-opacity duration-300 group-hover:opacity-30'
            : 'bg-gradient-to-t from-secondary-100/20 to-transparent opacity-20 blur-xl transition-opacity duration-300 group-hover:opacity-40'
        }`}></div>
      </div>
      
      {/* Content */}
      <div className="relative p-4 backdrop-blur-sm rounded-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              theme === 'dark'
                ? 'bg-secondary-800/50 border border-secondary-700'
                : 'bg-white border border-secondary-200 shadow-sm'
            }`}>
              <Crown className="w-4 h-4" />
            </div>
            <div>
              <h3 className={`font-semibold transition-colors duration-300 ${
                theme === 'dark'
                  ? 'text-white'
                  : 'text-secondary-900'
              }`}>{username}</h3>
              <p className={`text-xs transition-colors duration-300 ${
                theme === 'dark'
                  ? 'text-secondary-400'
                  : 'text-secondary-600'
              }`}>{game}</p>
            </div>
          </div>
          <div className={`text-xs transition-colors duration-300 ${
            theme === 'dark'
              ? 'text-secondary-400'
              : 'text-secondary-600'
          }`}>
            {timeAgo}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className={`text-lg font-bold transition-colors duration-300 ${
            theme === 'dark'
              ? 'text-accent-400'
              : 'text-accent-600'
          }`}>
            {amount}
          </div>
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
            theme === 'dark'
              ? 'bg-secondary-800/50 text-secondary-400'
              : 'bg-white text-secondary-600'
          }`}>
            <Flame className="w-3 h-3" />
            <span>{multiplier}x</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description, icon, gradient }: FeatureCardProps) => {
  const { theme } = useTheme();
  
  return (
    <div className="group relative">
      {/* Background blur effect */}
      <div className="absolute inset-0 rounded-2xl transition-transform duration-300 group-hover:scale-105">
        <div className={`absolute inset-0 rounded-2xl transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-secondary-800/50 border border-secondary-700'
            : 'bg-white shadow-lg border border-secondary-200'
        }`}></div>
        <div className={`absolute bottom-0 left-0 w-full h-1/2 rounded-b-2xl ${gradient} opacity-20 blur-xl transition-opacity duration-300 group-hover:opacity-30`}></div>
      </div>
      
      {/* Content */}
      <div className="relative p-6 backdrop-blur-xl rounded-2xl">
        <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 transform group-hover:scale-110 transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-secondary-800/50 border border-secondary-700'
            : 'bg-white border border-secondary-200 shadow-sm'
        }`}>
          {React.cloneElement(icon, {
            className: `w-6 h-6 ${
              theme === 'dark'
                ? 'text-primary-400'
                : 'text-primary-500'
            }`
          } as React.SVGProps<SVGSVGElement>)}
        </div>
        <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 ${
          theme === 'dark'
            ? 'text-white'
            : 'text-secondary-900'
        }`}>{title}</h3>
        <p className={`text-sm transition-colors duration-300 ${
          theme === 'dark'
            ? 'text-secondary-400'
            : 'text-secondary-600'
        }`}>{description}</p>
      </div>
    </div>
  );
};

export default function SlotGameHero() {
  const { theme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [winners, setWinners] = useState([
    {
      username: "CryptoKing",
      game: "Mega Fortune Slots",
      amount: "$12,450",
      timeAgo: "2 minutes ago",
      multiplier: "150"
    },
    {
      username: "LuckySpinner",
      game: "Book of Dead",
      amount: "$8,920",
      timeAgo: "5 minutes ago",
      multiplier: "120"
    },
    {
      username: "SlotMaster",
      game: "Starburst XXXtreme",
      amount: "$15,750",
      timeAgo: "8 minutes ago",
      multiplier: "200"
    }
  ]);

  const [jackpotAmount, setJackpotAmount] = useState(999999);
  const [isSpinning, setIsSpinning] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [slotSymbols, setSlotSymbols] = useState(['7', '$', '', '', '']);
  const [currentSymbols, setCurrentSymbols] = useState(['7', '7', '7']);

  const slides = [
    {
      title: "Panda Master",
      badge: "Premium",
      tag: "Slot More, Win More! ",
      description: "Experience the mystical world of pandas in this enchanting game",
      image: "/images/faq/2.jpg",
      stats: [
        { icon: "", value: "500 Spins", label: "Daily Bonus" },
        { icon: "", value: "2X XP", label: "Premium Boost" },
        { icon: "", value: "$10,000", label: "Weekly Draw" }
      ]
    },
    {
      title: "VBlink",
      badge: "Featured",
      tag: "All Day is Happy Day! ",
      description: "Fast-paced action with stunning visual effects",
      image: "/images/faq/2.jpg",
      stats: [
        { icon: "", value: "300 Spins", label: "Welcome Pack" },
        { icon: "", value: "VIP XP", label: "Fast Level Up" },
        { icon: "", value: "$5,000", label: "Daily Jackpot" }
      ]
    },
    {
      title: "Orion Stars",
      badge: "Popular",
      tag: "Cash Through Bitcoin! ",
      description: "Journey through the cosmos for stellar wins",
      image: "/images/faq/3.jpg",
      stats: [
        { icon: "", value: "Crypto", label: "Fast Payouts" },
        { icon: "", value: "1000x", label: "Max Win" },
        { icon: "", value: "$50,000", label: "Monthly Draw" }
      ]
    },
    {
      title: "Golden Treasure",
      badge: "New",
      tag: "Win More Every Hour! ",
      description: "Discover ancient riches and golden opportunities",
      image: "/images/faq/4.jpg",
      stats: [
        { icon: "", value: "Hourly", label: "Bonus Spins" },
        { icon: "", value: "Lucky XP", label: "Random Boost" },
        { icon: "", value: "$25,000", label: "Prize Pool" }
      ]
    },
    {
      title: "Egames",
      badge: "Featured",
      tag: "Level Up, Cash Out! ",
      description: "Collection of exciting electronic gaming experiences",
      image: "/images/faq/5.jpg",
      stats: [
        { icon: "", value: "Games XP", label: "Multi Boost" },
        { icon: "", value: "Daily", label: "Tournaments" },
        { icon: "", value: "$15,000", label: "Weekly Prize" }
      ]
    },
    {
      title: "Milk Way",
      badge: "Premium",
      tag: "Instant Bitcoin Wins! ",
      description: "Explore the galaxy of endless possibilities",
      image: "/images/faq/4.jpg",
      stats: [
        { icon: "", value: " Spins", label: "VIP Package" },
        { icon: "", value: "Turbo XP", label: "5X Boost" },
        { icon: "", value: "$100,000", label: "Mega Draw" }
      ]
    },
    {
      title: "Juwa",
      badge: "Popular",
      tag: "Play More, Earn More! ",
      description: "Traditional games with a modern twist",
      image: "/images/faq/3.jpg",
      stats: [
        { icon: "", value: "200 Spins", label: "Daily Free" },
        { icon: "", value: "Lucky XP", label: "Asian Boost" },
        { icon: "", value: "$20,000", label: "Lucky Draw" }
      ]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    
    let spins = 0;
    const maxSpins = 20;
    const spinInterval = setInterval(() => {
      setCurrentSymbols(prev => 
        prev.map(() => slotSymbols[Math.floor(Math.random() * slotSymbols.length)])
      );
      spins++;
      
      if (spins >= maxSpins) {
        clearInterval(spinInterval);
        setIsSpinning(false);
      }
    }, 100);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setJackpotAmount(prev => prev + Math.floor(Math.random() * 100));
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setWinners(prevWinners => {
        const newWinner = {
          username: `Player${Math.floor(Math.random() * 1000)}`,
          game: ["Mega Fortune", "Starburst", "Gonzo's Quest", "Book of Dead"][Math.floor(Math.random() * 4)],
          amount: `$${(Math.random() * 10000).toFixed(2)}`,
          timeAgo: "Just now",
          multiplier: (Math.random() * 200).toFixed(0)
        };
        return [newWinner, ...prevWinners.slice(0, -1)];
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 8000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const features = [
    {
      title: 'Bitcoin Cashout',
      description: 'Instant crypto withdrawals 24/7',
      icon: <Bitcoin className="w-6 h-6" />,
      gradient: theme === 'dark' 
        ? 'bg-gradient-to-r from-[#0E0E0E] via-[#1A1A1A] to-[#0E0E0E]' 
        : 'bg-gradient-to-br from-[#F5F5DC] via-[#FFCF9D]/50 to-[#F5F5DC]'
    },
    {
      title: 'Happy Hours',
      description: 'Double rewards all day long',
      icon: <Timer className="w-6 h-6" />,
      gradient: theme === 'dark'
        ? 'bg-gradient-to-r from-[#0E0E0E] via-[#1A1A1A] to-[#0E0E0E]' 
        : 'bg-gradient-to-br from-[#F5F5DC] via-[#FFCF9D]/50 to-[#F5F5DC]'
    },
    {
      title: 'Weekly Draw',
      description: '$10,000 prize pool every week',
      icon: <Trophy className="w-6 h-6" />,
      gradient: theme === 'dark'
        ? 'bg-gradient-to-r from-[#0E0E0E] via-[#1A1A1A] to-[#0E0E0E]' 
        : 'bg-gradient-to-br from-[#F5F5DC] via-[#FFCF9D]/50 to-[#F5F5DC]'
    },
    {
      title: 'Monthly Draw',
      description: 'Massive $50,000 monthly rewards',
      icon: <ChipIcon className="w-6 h-6" />,
      gradient: theme === 'dark'
        ? 'bg-gradient-to-r from-[#0E0E0E] via-[#1A1A1A] to-[#0E0E0E]' 
        : 'bg-gradient-to-br from-[#F5F5DC] via-[#FFCF9D]/50 to-[#F5F5DC]'
    }
  ];

  const stats = [
    { label: 'Active Players', value: '10K+', icon: Users },
    { label: 'Total Games', value: '500+', icon: Trophy },
    { label: 'Daily Prizes', value: '$50K', icon: Coins }
  ];

  return (
    <section className="relative mt-20 min-h-screen bg-[#0E0E0E]">
      {/* Luxury pattern background */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 bg-[url('/images/faq/5.png')] bg-repeat opacity-5
          ${theme === 'dark' ? 'mix-blend-overlay' : 'mix-blend-multiply'}`} />
        
        {/* Diamond Patterns */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Top-left large diamond */}
          <div className={`absolute -top-20 -left-20 w-96 h-96 rotate-45 rounded-3xl
            ${theme === 'dark' 
              ? 'bg-gradient-to-br from-[#FFB000]/5 to-transparent' 
              : 'bg-gradient-to-br from-[#0E0E0E]/5 to-transparent'}`} />
          
          {/* Bottom-right large diamond */}
          <div className={`absolute -bottom-20 -right-20 w-96 h-96 rotate-45 rounded-3xl
            ${theme === 'dark' 
              ? 'bg-gradient-to-tl from-[#FFB000]/5 to-transparent' 
              : 'bg-gradient-to-tl from-[#0E0E0E]/5 to-transparent'}`} />
          
          {/* Center decorative diamonds */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className={`absolute w-48 h-48 rotate-45 rounded-2xl -translate-x-full -translate-y-full
              ${theme === 'dark' 
                ? 'bg-gradient-to-br from-[#FFB000]/3 to-transparent' 
                : 'bg-gradient-to-br from-[#0E0E0E]/3 to-transparent'}`} />
            <div className={`absolute w-48 h-48 rotate-45 rounded-2xl translate-x-0 -translate-y-full
              ${theme === 'dark' 
                ? 'bg-gradient-to-bl from-[#FFB000]/3 to-transparent' 
                : 'bg-gradient-to-bl from-[#0E0E0E]/3 to-transparent'}`} />
            <div className={`absolute w-48 h-48 rotate-45 rounded-2xl -translate-x-full translate-y-0
              ${theme === 'dark' 
                ? 'bg-gradient-to-tr from-[#FFB000]/3 to-transparent' 
                : 'bg-gradient-to-tr from-[#0E0E0E]/3 to-transparent'}`} />
            <div className={`absolute w-48 h-48 rotate-45 rounded-2xl translate-x-0 translate-y-0
              ${theme === 'dark' 
                ? 'bg-gradient-to-tl from-[#FFB000]/3 to-transparent' 
                : 'bg-gradient-to-tl from-[#0E0E0E]/3 to-transparent'}`} />
          </div>

          {/* Small diamond accents */}
          <div className={`absolute top-1/4 left-1/4 w-24 h-24 rotate-45 rounded-xl
            ${theme === 'dark' 
              ? 'bg-gradient-to-br from-[#FFB000]/3 to-transparent' 
              : 'bg-gradient-to-br from-[#0E0E0E]/3 to-transparent'}`} />
          <div className={`absolute top-3/4 right-1/4 w-24 h-24 rotate-45 rounded-xl
            ${theme === 'dark' 
              ? 'bg-gradient-to-tl from-[#FFB000]/3 to-transparent' 
              : 'bg-gradient-to-tl from-[#0E0E0E]/3 to-transparent'}`} />
        </div>
        
        {/* Elegant light effect */}
        <div className={`absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/5`} />
      </div>

      <div className="relative">
        {/* Hero Slides */}
        <div className="relative h-[600px] overflow-hidden rounded-2xl">
          {/* Current Slide */}
          <div className="absolute inset-0 slide-enter">
            <div className="relative h-full game-card">
              {/* Game Image */}
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover"
              />
              
              {/* Badge */}
              <div className="absolute top-6 right-6">
                <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                  slides[currentSlide].badge === 'Premium' ? 'badge-premium' :
                  slides[currentSlide].badge === 'Featured' ? 'badge-featured' :
                  slides[currentSlide].badge === 'Popular' ? 'badge-popular' :
                  'badge-new'
                }`}>
                  {slides[currentSlide].badge}
                </span>
              </div>
              
              {/* Content Overlay */}
              <div className="absolute inset-0 game-overlay">
                <div className="h-full flex flex-col justify-center items-center p-8">
                  {/* Tag Line */}
                  <div className="mb-8">
                    <span className="tag-badge px-8 py-3 rounded-full text-lg inline-block">
                      {slides[currentSlide].tag}
                    </span>
                  </div>
                  
                  {/* Title Section */}
                  <h2 className="game-title mb-6 text-center max-w-4xl">
                    {slides[currentSlide].title}
                  </h2>
                  <p className="game-description text-2xl text-[#FFCF9D] mb-14 text-center max-w-2xl">
                    {slides[currentSlide].description}
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-10 mb-14 w-full max-w-5xl">
                    {slides[currentSlide].stats.map((stat, index) => (
                      <div key={index} className="stat-card p-8 rounded-xl">
                        <div className={`game-icon mb-6 ${
                          index === 0 ? 'game-icon-bounce' :
                          index === 1 ? 'game-icon-spin' : 'game-icon-pulse'
                        }`}>
                          {stat.icon}
                        </div>
                        <div className="stat-value mb-3">
                          {stat.value}
                        </div>
                        <div className="stat-label text-[#FFCF9D]">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Play Button */}
                  <button className="play-button group">
                    <span className="mr-3">Play Now</span>
                    <span className="group-hover:translate-x-2 transition-transform inline-block duration-500">
                      →
                    </span>
                  </button>
                </div>
              </div>

              {/* Preview Thumbnails */}
              <div className="absolute -bottom-28 left-1/2 transform -translate-x-1/2 flex gap-6">
                {slides.map((slide, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`preview-thumbnail w-28 h-20 rounded-xl overflow-hidden ${
                      currentSlide === index ? 'active' : ''
                    }`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Arrow Controls */}
          <button
            onClick={prevSlide}
            className="nav-arrow absolute left-6 top-1/2 -translate-y-1/2 flex items-center justify-center"
            aria-label="Previous slide"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="nav-arrow absolute right-6 top-1/2 -translate-y-1/2 flex items-center justify-center"
            aria-label="Next slide"
          >
            →
          </button>
        </div>

        {/* Game Preview Grid */}
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {[
              { name: 'Panda Master', multiplier: '200x', image: '/panda-master.jpg', theme: 'bg-emerald-500' },
              { name: 'Egames', multiplier: '150x', image: '/egames.jpg', theme: 'bg-blue-500' },
              { name: 'Orion Stars', multiplier: '300x', image: '/orion.jpg', theme: 'bg-[#0E0E0E]' },
              { name: 'Milkyway', multiplier: '250x', image: '/milkyway.jpg', theme: 'bg-indigo-500' },
              { name: 'Vblink', multiplier: '180x', image: '/vblink.jpg', theme: 'bg-pink-500' },
              { name: 'Golden Treasure', multiplier: '400x', image: '/golden-treasure.jpg', theme: 'bg-amber-500' },
              { name: 'Juwa', multiplier: '220x', image: '/juwa.jpg', theme: 'bg-rose-500' },
              { name: 'Fortune Tiger', multiplier: '350x', image: '/fortune-tiger.jpg', theme: 'bg-orange-500' }
            ].slice(0, 4).map((game, index) => (
              <div key={index} className="game-preview group">
                <div className="relative w-full h-full overflow-hidden rounded-2xl">
                  <img
          src={`/${index}.jpg`}
                    alt={`${game.name} Preview`}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E]/90 via-[#1A1A1A]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${game.theme} bg-opacity-90`}>
                      HOT
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="game-preview-title text-2xl font-bold mb-2 text-[#FFB000]">
                      {game.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-[#FFCF9D] text-sm">Up to</span>
                        <p className="game-preview-multiplier text-[#FFB000] font-bold">
                          {game.multiplier}
                        </p>
                      </div>
                      <button className="w-10 h-10 rounded-full bg-[#FFB000] text-[#0E0E0E] flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-500">
                        →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-64 h-64">
          <div className={`absolute inset-0 rounded-full ${theme === 'dark' ? 'bg-[#FFB000]' : 'bg-[#0E0E0E]'} opacity-5 blur-3xl`} />
        </div>
        <div className="absolute bottom-20 left-20 w-64 h-64">
          <div className={`absolute inset-0 rounded-full ${theme === 'dark' ? 'bg-[#FFB000]' : 'bg-[#0E0E0E]'} opacity-5 blur-3xl`} />
        </div>
        
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            {/* Left Content */}
            <div className="flex-1 space-y-10">
              {/* Status badge */}
              <div className={`inline-flex items-center space-x-3 rounded-full px-6 py-3 shadow-lg
                ${theme === 'dark'
                  ? 'bg-[#1A1A1A] border border-[#FFB000]/30'
                  : 'bg-white/80 border border-[#0E0E0E]/30'}`}>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FFB000]" />
                </span>
                <span className={`text-sm font-medium tracking-wide uppercase ${
                  theme === 'dark'
                    ? 'text-[#FFCF9D]'
                    : 'text-[#0E0E0E]'
                }`}>Live Games Available</span>
              </div>

              {/* Royal heading */}
              <div className="space-y-8">
                <h1 className={`text-6xl lg:text-7xl font-bold tracking-tight relative
                  ${theme === 'dark' 
                    ? 'text-[#F5F5DC]' 
                    : 'text-[#0E0E0E]'}`}>
                  <span className="relative inline-block">
                    <span className={`relative z-10 ${theme === 'dark' ? 'text-[#FFB000]' : 'text-[#0E0E0E]'}`}>
                      Play Slots
                    </span>
                    <span className="absolute -top-8 -right-8 text-4xl opacity-80">👑</span>
                  </span>
                  <br />
                  <span className="relative inline-block mt-4">
                    <span className={`relative z-10 ${theme === 'dark' ? 'text-[#FFCF9D]' : 'text-[#0E0E0E]'}`}>
                      Win Big!
                    </span>
                    <span className="absolute -bottom-8 -right-8 text-4xl opacity-80">💎</span>
                  </span>
                </h1>
                
                <p className={`text-xl max-w-2xl leading-relaxed ${
                  theme === 'dark' ? 'text-[#FFCF9D]/90' : 'text-[#0E0E0E]/90'
                }`}>
                  Experience the thrill of premium slots in our royal casino. Join thousands of winners and start your winning streak today!
                </p>
              </div>

              {/* CTA section */}
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <button 
                  onClick={handleSpin}
                  className={`relative px-10 py-5 rounded-xl font-bold text-xl uppercase tracking-wider shadow-lg
                    transition-colors duration-300
                    ${theme === 'dark'
                      ? 'bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] text-[#0E0E0E] hover:from-[#FFCF9D] hover:to-[#FFB000]'
                      : 'bg-gradient-to-r from-[#0E0E0E] to-[#1A1A1A] text-[#F5F5DC] hover:from-[#1A1A1A] hover:to-[#0E0E0E]'}`}>
                  Start Playing Now
                </button>

                {/* Jackpot display */}
                <div className={`px-8 py-5 rounded-xl shadow-lg backdrop-blur-sm
                  ${theme === 'dark' 
                    ? 'bg-[#1A1A1A] border border-[#FFB000]/30' 
                    : 'bg-white/80 border border-[#0E0E0E]/30'}`}>
                  <div className="flex items-center gap-6">
                    <span className={`uppercase font-bold tracking-wide ${
                      theme === 'dark'
                        ? 'text-[#FFCF9D]'
                        : 'text-[#0E0E0E]'
                    }`}>Royal Jackpot</span>
                    <span className={`text-3xl font-bold ${
                      theme === 'dark' ? 'text-[#FFB000]' : 'text-[#0E0E0E]'
                    }`}>
                      ${jackpotAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats display */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12">
                {stats.map((stat, i) => (
                  <div key={i} className={`p-6 rounded-xl shadow-lg backdrop-blur-sm
                    ${theme === 'dark'
                      ? 'bg-[#1A1A1A]/80 border border-[#FFB000]/30'
                      : 'bg-white/80 border border-[#0E0E0E]/30'}`}>
                    <div className="space-y-3">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3
                        ${theme === 'dark'
                          ? 'bg-[#0E0E0E] text-[#FFB000]'
                          : 'bg-[#F5F5DC] text-[#0E0E0E]'}`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <div className={`text-2xl font-bold ${
                        theme === 'dark' ? 'text-[#FFB000]' : 'text-[#0E0E0E]'
                      }`}>{stat.value}</div>
                      <div className={`text-sm font-medium uppercase tracking-wider ${
                        theme === 'dark' ? 'text-[#FFCF9D]/90' : 'text-[#0E0E0E]/90'
                      }`}>{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Enhanced Slot Machine Preview */}
            <div className="flex-1 relative">
              <div className={`relative aspect-square max-w-lg mx-auto shadow-xl backdrop-blur-sm
                ${theme === 'dark'
                  ? 'bg-[#1A1A1A]/90 border border-[#FFB000]/30'
                  : 'bg-white/90 border border-[#0E0E0E]/30'}
                rounded-2xl overflow-hidden`}>
                
                {/* Slot Machine Display */}
                <div className="relative h-full flex flex-col justify-center items-center p-8">
                  {/* Machine Top */}
                  <div className={`w-full h-24 mb-8 rounded-xl relative overflow-hidden shadow-lg
                    ${theme === 'dark'
                      ? 'bg-gradient-to-r from-[#1A1A1A] via-[#0E0E0E] to-[#1A1A1A] border border-[#FFB000]/30'
                      : 'bg-gradient-to-r from-[#F5F5DC] via-white to-[#F5F5DC] border border-[#0E0E0E]/30'}`}>
                    <div className="absolute top-3 right-3 text-2xl opacity-90">👑</div>
                    <div className="flex justify-center items-center h-full">
                      <span className={`text-2xl font-bold uppercase tracking-[0.2em] ${
                        theme === 'dark' ? 'text-[#FFB000]' : 'text-[#0E0E0E]'
                      }`}>Royal Fortune</span>
                    </div>
                  </div>

                  {/* Slot Reels */}
                  <div className="flex gap-6 mb-12">
                    {currentSymbols.map((symbol, index) => (
                      <div
                        key={index}
                        className={`w-28 h-28 flex items-center justify-center rounded-xl text-5xl relative shadow-lg overflow-hidden
                          ${theme === 'dark'
                            ? 'bg-gradient-to-br from-[#1A1A1A] to-[#0E0E0E] border border-[#FFB000]/30'
                            : 'bg-gradient-to-br from-[#F5F5DC] to-white border border-[#0E0E0E]/30'}
                          ${isSpinning ? 'slot-glow' : ''}`}
                      >
                        <div className={`flex items-center justify-center transition-all duration-300 ${isSpinning ? 'slot-spinning' : ''}`}>
                          {symbol === '7' ? '7️⃣' : 
                           symbol === '$' ? '💰' : 
                           symbol === '' ? '👑' : symbol}
                        </div>
                        {/* Light effects */}
                        <div className={`absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 transition-opacity duration-300 ${isSpinning ? 'opacity-100' : ''}`} />
                        <div className={`absolute inset-0 border-t-2 border-b-2 border-[#FFB000]/20 ${isSpinning ? 'opacity-100' : 'opacity-0'}`} />
                      </div>
                    ))}
                  </div>

                  {/* Jackpot Display */}
                  <div className={`text-3xl font-bold mb-8 ${theme === 'dark' ? 'text-[#FFB000]' : 'text-[#0E0E0E]'} jackpot-text`}>
                    ${jackpotAmount.toLocaleString()}
                  </div>

                  {/* Spin Button */}
                  <button
                    onClick={handleSpin}
                    disabled={isSpinning}
                    className={`px-12 py-4 rounded-full font-bold text-xl uppercase tracking-wider
                      transition-all duration-300 transform hover:scale-105 relative overflow-hidden
                      ${isSpinning ? 'cursor-not-allowed opacity-70' : 'hover:shadow-lg'}
                      ${theme === 'dark'
                        ? 'bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] text-[#0E0E0E]'
                        : 'bg-gradient-to-r from-[#0E0E0E] to-[#1A1A1A] text-[#F5F5DC]'}`}
                  >
                    <span className={`relative z-10 ${isSpinning ? 'animate-pulse' : ''}`}>
                      {isSpinning ? 'Spinning...' : 'SPIN NOW!'}
                    </span>
                    <div className={`absolute inset-0 bg-gradient-to-r from-[#FFB000]/20 to-[#FFCF9D]/20 transform transition-transform duration-500
                      ${isSpinning ? 'translate-x-full' : '-translate-x-full'}`} />
                  </button>
                </div>

                {/* Subtle Corner Accents */}
                <div className="absolute top-3 left-3 text-2xl opacity-10">💎</div>
                <div className="absolute top-3 right-3 text-2xl opacity-10">💎</div>
                <div className="absolute bottom-3 left-3 text-2xl opacity-10">💎</div>
                <div className="absolute bottom-3 right-3 text-2xl opacity-10">💎</div>
              </div>

              {/* Subtle Background Element */}
              <div className="absolute -inset-4 -z-10">
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 transform -translate-y-1/2
                  ${theme === 'dark' ? 'text-[#FFB000]' : 'text-[#0E0E0E]'} opacity-5 text-8xl`}>
                  👑
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mouse trail effect - single chip */}
      <div
        className="pointer-events-none fixed w-12 h-12 transition-all duration-300"
        style={{
          left: mousePosition.x - 24,
          top: mousePosition.y - 24,
          transform: `rotate(${Math.atan2(mousePosition.y, mousePosition.x) * (180 / Math.PI)}deg)`,
        }}
      >
        <div className="relative">
          <div className={`absolute inset-0 expand-glow-gold transition-all duration-500 ${
            theme === 'dark' ? 'opacity-20' : 'opacity-10'
          }`}>
            <ChipIcon className="w-full h-full text-[#FFB000]" />
          </div>
          <div className={`absolute inset-0 ping-gold transition-all duration-500 ${
            theme === 'dark' ? 'opacity-10' : 'opacity-5'
          }`}>
            <ChipIcon className="w-full h-full text-[#FFB000]" />
          </div>
        </div>
      </div>
    </section>
  );
}
