'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ThumbsUp, User, MessageCircle, Trophy, Crown, Sparkles } from 'lucide-react';

interface Review {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
  likes: number;
  verified: boolean;
  badge?: {
    icon: React.ReactNode;
    label: string;
    color: string;
  };
}

const reviews: Review[] = [
  {
    id: 1,
    author: "Alex Thompson",
    avatar: "/avatars/1.jpg",
    rating: 5,
    date: "2025-01-10",
    content: "Best casino experience ever! The slot games are incredibly engaging and the payouts are fantastic. The VIP support team is always there when you need them.",
    likes: 234,
    verified: true,
    badge: {
      icon: <Crown className="w-4 h-4" />,
      label: "VIP Player",
      color: "#FFB000"
    }
  },
  {
    id: 2,
    author: "Sarah Chen",
    avatar: "/avatars/2.jpg",
    rating: 5,
    date: "2025-01-09",
    content: "I've won multiple jackpots here! The games are fair and the platform is super reliable. Love the new slot machine themes they keep adding.",
    likes: 189,
    verified: true,
    badge: {
      icon: <Trophy className="w-4 h-4" />,
      label: "Top Winner",
      color: "#34C759"
    }
  },
  {
    id: 3,
    author: "Michael Rodriguez",
    avatar: "/avatars/3.jpg",
    rating: 4,
    date: "2025-01-08",
    content: "Great selection of games and amazing customer service. The only reason for 4 stars is that I'd love to see more crypto payment options.",
    likes: 156,
    verified: true
  }
];

const ReviewCard = ({ review }: { review: Review }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{
          scale: 1.02,
          rotateX: 2,
          rotateY: 2,
          transition: { duration: 0.2 }
        }}
        className="relative bg-[#1A1A1A]/80 backdrop-blur-xl rounded-2xl p-6 border-2 border-[#FFB000]/20 group overflow-hidden"
        style={{ perspective: '1000px' }}
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

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] p-0.5">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={review.avatar}
                    alt={review.author}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
              </div>
              {review.verified && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-1 -bottom-1 bg-[#34C759] rounded-full p-1"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <ThumbsUp className="w-3 h-3 text-black" />
                  </motion.div>
                </motion.div>
              )}
            </div>

            {/* Author Info */}
            <div>
              <h3 className="font-bold text-[#FFCF9D]">{review.author}</h3>
              <div className="flex items-center gap-2 text-sm text-[#FFCF9D]/70">
                <span>{review.date}</span>
                {review.badge && (
                  <div 
                    className="px-2 py-0.5 rounded-full flex items-center gap-1 text-xs font-bold"
                    style={{ backgroundColor: `${review.badge.color}20`, color: review.badge.color }}
                  >
                    {review.badge.icon}
                    {review.badge.label}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={i < review.rating ? {
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                } : {}}
                transition={{
                  duration: 0.3,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 5
                }}
              >
                <Star
                  className={`w-5 h-5 ${
                    i < review.rating ? 'text-[#FFB000]' : 'text-[#FFB000]/20'
                  }`}
                  fill={i < review.rating ? '#FFB000' : 'none'}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative">
          <Quote className="absolute -left-1 -top-1 w-6 h-6 text-[#FFB000]/20" />
          <p className="text-[#FFCF9D]/70 pl-7">{review.content}</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#FFB000]/10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-sm text-[#FFCF9D]/70 hover:text-[#FFB000] transition-colors"
          >
            <ThumbsUp className="w-4 h-4" />
            <span>{review.likes} Helpful</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-sm text-[#FFCF9D]/70 hover:text-[#FFB000] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Reply</span>
          </motion.button>
        </div>

        {/* Background Glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at center, ${review.badge?.color || '#FFB000'}40 0%, transparent 70%)`
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

const ReviewSection = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
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

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="relative inline-block">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] bg-clip-text text-transparent mb-4">
              Lucky Winners 🎰
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
            See what our jackpot winners have to say about their experience! 💎
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Add Review Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mx-auto mt-12 flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] text-black font-bold rounded-xl"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Share Your Story</span>
        </motion.button>

        {/* Spotlight Effect */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-transparent to-[#0E0E0E] opacity-60" />
      </div>
    </section>
  );
};

export default ReviewSection;
