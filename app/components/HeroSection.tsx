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
            ? 'bg-yellow-400/30 border border-yellow-400/10'
            : 'bg-white shadow-lg border border-gray-100'
        }`}></div>
        <div className={`absolute bottom-0 left-0 w-full h-1/2 rounded-b-xl ${
          theme === 'dark'
            ? 'bg-gradient-to-t from-fuchsia-200/30 to-transparent opacity-20 blur-xl transition-opacity duration-300 group-hover:opacity-30'
            : 'bg-gradient-to-t from-orange-100/30 to-transparent opacity-20 blur-xl transition-opacity duration-300 group-hover:opacity-40'
        }`}></div>
      </div>
      
      {/* Content */}
      <div className="relative p-4 backdrop-blur-sm rounded-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              theme === 'dark'
                ? 'bg-yellow-400/20 text-yellow-400'
                : 'bg-orange-50 border-orange-100'
            }`}>
              <Crown className="w-4 h-4" />
            </div>
            <div>
              <h3 className={`font-semibold transition-colors duration-300 ${
                theme === 'dark'
                  ? 'text-gray-200'
                  : 'text-gray-700'
              }`}>{username}</h3>
              <p className={`text-xs transition-colors duration-300 ${
                theme === 'dark'
                  ? 'text-gray-400'
                  : 'text-gray-600'
              }`}>{game}</p>
            </div>
          </div>
          <div className={`text-xs transition-colors duration-300 ${
            theme === 'dark'
              ? 'text-gray-400'
              : 'text-gray-500'
          }`}>
            {timeAgo}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className={`text-lg font-bold transition-colors duration-300 ${
            theme === 'dark'
              ? 'text-yellow-400'
              : 'text-orange-600'
          }`}>
            {amount}
          </div>
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
            theme === 'dark'
              ? 'bg-yellow-400/10 text-yellow-400'
              : 'bg-orange-50 text-orange-600'
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
            ? 'bg-yellow-400/50 border border-yellow-400/20'
            : 'bg-white shadow-lg border border-gray-100'
        }`}></div>
        <div className={`absolute bottom-0 left-0 w-full h-1/2 rounded-b-2xl ${gradient} opacity-20 blur-xl transition-opacity duration-300 group-hover:opacity-30`}></div>
      </div>
      
      {/* Content */}
      <div className="relative p-6 backdrop-blur-xl rounded-2xl">
        <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 transform group-hover:scale-110 transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-yellow-400/50 border-yellow-400/20'
            : 'bg-orange-50 border-orange-100'
        }`}>
          {React.cloneElement(icon, {
            className: `w-6 h-6 ${theme === 'dark' ? 'text-yellow-400' : 'text-orange-600'}`
          } as React.SVGProps<SVGSVGElement>)}
        </div>
        <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 ${
          theme === 'dark'
            ? 'text-gray-200 group-hover:text-yellow-400'
            : 'text-gray-800 group-hover:text-orange-600'
        }`}>{title}</h3>
        <p className={`text-sm transition-colors duration-300 ${
          theme === 'dark'
            ? 'text-gray-400'
            : 'text-gray-600'
        }`}>{description}</p>
      </div>
    </div>
  );
};

export default function SlotGameHero() {
  const { theme } = useTheme();
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
  const [clickEffects, setClickEffects] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [slotSymbols, setSlotSymbols] = useState(['7', '$', '', '', '']);
  const [currentSymbols, setCurrentSymbols] = useState(['7', '7', '7']);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleClick = (e: React.MouseEvent) => {
    const newEffect = {
      x: e.clientX,
      y: e.clientY,
      id: Date.now(),
    };
    setClickEffects(prev => [...prev, newEffect]);
    setTimeout(() => {
      setClickEffects(prev => prev.filter(effect => effect.id !== newEffect.id));
    }, 1000);
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

  const features = [
    {
      title: 'Bitcoin Cashout',
      description: 'Instant crypto withdrawals 24/7',
      icon: <Bitcoin className="w-6 h-6" />,
      gradient: theme === 'dark' 
        ? 'bg-gradient-to-r from-yellow-400/20 to-orange-500/20'
        : 'bg-gradient-to-br from-orange-100/50 to-amber-50/50'
    },
    {
      title: 'Happy Hours',
      description: 'Double rewards all day long',
      icon: <Timer className="w-6 h-6" />,
      gradient: theme === 'dark'
        ? 'bg-gradient-to-r from-green-400/20 to-emerald-500/20'
        : 'bg-gradient-to-br from-orange-100/50 to-amber-50/50'
    },
    {
      title: 'Weekly Draw',
      description: '$10,000 prize pool every week',
      icon: <Trophy className="w-6 h-6" />,
      gradient: theme === 'dark'
        ? 'bg-gradient-to-r from-yellow-400/20 to-orange-500/20'
        : 'bg-gradient-to-br from-orange-100/50 to-amber-50/50'
    },
    {
      title: 'Monthly Draw',
      description: 'Massive $50,000 monthly rewards',
      icon: <ChipIcon className="w-6 h-6" />,
      gradient: theme === 'dark'
        ? 'bg-gradient-to-r from-blue-400/20 to-indigo-500/20'
        : 'bg-gradient-to-br from-orange-100/50 to-amber-50/50'
    }
  ];

  return (
    <div 
      className={`relative overflow-hidden min-h-screen bg-hero-gradient`}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {/* Animated background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Hexagon grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="relative w-full h-full">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-32 h-32"
                style={{
                  left: `${(i % 5) * 25}%`,
                  top: `${Math.floor(i / 5) * 25}%`,
                  transform: `rotate(${i * 30}deg)`,
                  opacity: 0.1 + (i % 3) * 0.1
                }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
                  <polygon points="50 0, 93.3 25, 93.3 75, 50 100, 6.7 75, 6.7 25" fill="currentColor"/>
                </svg>
              </div>
            ))}
          </div>
        </div>
        
        {/* Glowing orbs with gradients */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/40 to-secondary/40 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-20 -left-20 w-60 h-60 bg-gradient-to-tr from-secondary/30 to-accent/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-40 right-20 w-40 h-40 bg-gradient-to-bl from-accent/30 to-primary/30 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-hero-gradient" />
        
        {/* Floating Chips */}
        <div className="chip-icon chip-1" />
        <div className="chip-icon chip-2" />
        <div className="chip-icon chip-3" />
        <div className="chip-icon chip-4" />
        
        <div className="container mx-auto px-4 py-24 flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-white/5 rounded-full px-4 py-2 backdrop-blur-sm border border-white/10 interactive-shine">
                <span className="text-accent animate-pulse">●</span>
                <span className="text-sm font-medium gold-text-effect">Live Games Available</span>
              </div>
              
              <h1 className={`text-4xl md:text-6xl font-bold tracking-tight ${
                theme === 'dark'
                  ? 'text-white'
                  : 'text-gray-900'
              } drop-shadow-[0_2px_20px_rgba(139,92,246,0.3)]`}>
                <span className="relative inline-block hover-tilt">
                  Win Big,
                  <div className="absolute -top-8 -right-8 group perspective-[1000px] interactive-float">
                    <div className="w-16 h-16 relative transform-style-preserve-3d transition-transform duration-500 group-hover:[transform:rotateY(180deg)]">
                      <div className="absolute w-full h-full backface-hidden animate-spin-glow">
                        <ChipIcon className="w-full h-full chip-icon-gold" />
                      </div>
                      <div className="absolute w-full h-full [transform:rotateY(180deg)] backface-hidden">
                        <ChipIcon className="w-full h-full chip-icon-gold" />
                      </div>
                    </div>
                  </div>
                </span>
                <br />
                <span className="relative inline-block">
                  Play More!
                  <div className="absolute -bottom-8 -right-8 group">
                    <div className="relative w-16 h-16">
                      <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-110">
                        <ChipIcon className="w-full h-full chip-icon-gold chip-icon-gold-glow" />
                      </div>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute inset-0 ping-gold">
                          <ChipIcon className="w-full h-full chip-icon-gold opacity-30" />
                        </div>
                      </div>
                    </div>
                  </div>
                </span>
              </h1>

              <p className="text-lg text-white/60 max-w-xl">
                Experience the thrill of our premium casino games. Play smart, win big, and join thousands of happy players.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-lg font-semibold text-white shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:-translate-y-0.5 interactive-shine click-effect">
                Start Playing
              </button>
              <button className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg font-semibold text-white hover:bg-white/10 transition-all duration-300 interactive-shine click-effect">
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              {[
                { label: 'Active Players', value: '10K+', icon: Users },
                { label: 'Total Games', value: '500+', icon: Trophy },
                { label: 'Daily Prizes', value: '$50K', icon: Coins }
              ].map((stat, i) => (
                <div key={i} className="text-center interactive-float sparkle-effect">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl stats-icon-container mb-3 click-effect">
                    <stat.icon className="w-6 h-6 icon-gold icon-gold-animated interactive-rotate" />
                  </div>
                  <div className="text-2xl font-bold gold-text-effect">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Game Preview */}
          <div className="flex-1 relative">
            <div className="game-preview-container aspect-square">
              {/* Floating Mini Previews */}
              <div className="mini-preview mini-preview-1">
                <div className="mini-preview-content">
                  <Image
                    src="/images/faq/2.jpg"
                    alt="Mega Fortune"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="mini-preview-overlay">
                    <div className="mini-preview-title">Mega Fortune</div>
                  </div>
                </div>
              </div>
              
              <div className="mini-preview mini-preview-2">
                <div className="mini-preview-content">
                  <Image
                    src="/images/faq/3.jpg"
                    alt="Golden Goddess"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="mini-preview-overlay">
                    <div className="mini-preview-title">Golden Goddess</div>
                  </div>
                </div>
              </div>
              
              <div className="mini-preview mini-preview-3">
                <div className="mini-preview-content">
                  <Image
                    src="/images/faq/1.jpg"
                    alt="Starburst"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="mini-preview-overlay">
                    <div className="mini-preview-title">Starburst</div>
                  </div>
                </div>
              </div>
              
              <div className="mini-preview mini-preview-4">
                <div className="mini-preview-content">
                  <Image
                    src="/images/faq/3.jpg"
                    alt="Book of Dead"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="mini-preview-overlay">
                    <div className="mini-preview-title">Book of Dead</div>
                  </div>
                </div>
              </div>
              
              <div className="mini-preview mini-preview-5">
                <div className="mini-preview-content">
                  <Image
                    src="/images/faq/3.jpg"
                    alt="Gonzo's Quest"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="mini-preview-overlay">
                    <div className="mini-preview-title">Gonzo's Quest</div>
                  </div>
                </div>
              </div>
              
              {/* Notches */}
              <div className="game-preview-notches">
                <div className="game-preview-notch game-preview-notch-top" />
                <div className="game-preview-notch game-preview-notch-bottom" />
                <div className="game-preview-notch game-preview-notch-left" />
                <div className="game-preview-notch game-preview-notch-right" />
              </div>
              
              {/* Corners */}
              <div className="game-preview-corner game-preview-corner-tl" />
              <div className="game-preview-corner game-preview-corner-tr" />
              <div className="game-preview-corner game-preview-corner-bl" />
              <div className="game-preview-corner game-preview-corner-br" />
              
              <div className="game-preview-content w-full h-full">
                {/* Scan line effect */}
                <div className="game-preview-scan" />
                
                {/* Glitch effect */}
                <div className="game-preview-glitch" />
                
                <Image
                  src="/images/faq/1.jpg"
                  alt="Game Preview"
                  fill
                  className="object-cover"
                />
                
                {/* Overlay gradients */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0" />
                  <div className="absolute inset-0 " />
                </div>
                
                {/* Game info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
                  <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 w-fit interactive-shine">
                    <div className="w-2 h-2 bg-gradient-to-r from-[#FFD700] to-[#DAA520] rounded-full animate-pulse" />
                    <span className="text-sm font-medium gold-text-effect">Live Now</span>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-3xl font-bold text-white">Premium Slots</h3>
                      <p className="text-white/60">Experience the thrill of winning big</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <button className="px-6 py-3 bg-gradient-to-r from-primary/90 to-secondary/90 backdrop-blur-sm rounded-xl text-white font-semibold
                        hover:from-primary hover:to-secondary transition-all duration-300 
                        hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5
                        focus:ring-2 focus:ring-primary/50 focus:outline-none">
                        Play Now
                      </button>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex -space-x-3">
                          {[...Array(4)].map((_, i) => (
                            <div 
                              key={i} 
                              className="w-10 h-10 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-sm
                                hover:scale-110 hover:z-10 transition-transform duration-200"
                              style={{
                                transform: `translateX(${i * 2}px)`,
                                zIndex: 4 - i
                              }}
                            />
                          ))}
                          <div className="w-10 h-10 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-sm 
                            flex items-center justify-center text-sm font-semibold text-white/90
                            hover:scale-110 transition-transform duration-200"
                            style={{ transform: 'translateX(8px)' }}>
                            +99
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute group"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`,
              }}
            >
              <div className="w-8 h-8 animate-float-shine transition-all duration-300 group-hover:scale-125">
                <ChipIcon className="w-full h-full chip-icon-gold opacity-20" />
              </div>
            </div>
          ))}
        </div>

        {/* Mouse trail effect */}
        {clickEffects.map(effect => (
          <div
            key={effect.id}
            className="absolute pointer-events-none"
            style={{
              left: effect.x - 32,
              top: effect.y - 32,
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 expand-glow-gold">
                <ChipIcon className="w-full h-full chip-icon-gold opacity-20" />
              </div>
              <div className="absolute inset-0 ping-gold">
                <ChipIcon className="w-full h-full chip-icon-gold opacity-10" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
