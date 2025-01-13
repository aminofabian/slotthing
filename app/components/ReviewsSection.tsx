'use client';

import React, { useState } from 'react';
import Star from './Star';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Sparkles, DollarSign, Clock, Award } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "Emma Thompson",
    game: "Fortune Wheel Deluxe",
    rating: 5,
    review: "Hit the jackpot on my first day! The animations are incredible and the bonus rounds are super exciting.",
    image: "https://thispersondoesnotexist.com",
    winAmount: "$2,450",
    date: "2 days ago",
    badge: "Mega Win"
  },
  {
    id: 2,
    name: "Michael Chen",
    game: "Dragon's Fortune",
    rating: 5,
    review: "Best slots game I've played! The dragon bonus feature is amazing. Already won multiple times!",
    image: "https://thispersondoesnotexist.com",
    winAmount: "$1,875",
    date: "1 week ago",
    badge: "Hot Streak"
  },
  {
    id: 3,
    name: "Sarah Williams",
    game: "Golden Pharaoh",
    rating: 5,
    review: "Love the Egyptian theme and the progressive jackpot system. Graphics are stunning!",
    image: "https://thispersondoesnotexist.com",
    winAmount: "$3,200",
    date: "3 days ago",
    badge: "Jackpot Winner"
  },
  {
    id: 4,
    name: "James Rodriguez",
    game: "Cosmic Spins",
    rating: 5,
    review: "The space theme is out of this world! Smooth gameplay and frequent wins keep me coming back.",
    image: "https://thispersondoesnotexist.com",
    winAmount: "$1,650",
    date: "5 days ago",
    badge: "Lucky Player"
  },
  {
    id: 5,
    name: "Lisa Anderson",
    game: "Lucky Leprechaun",
    rating: 5,
    review: "Found my pot of gold! The Irish luck theme is charming and the bonus rounds are generous.",
    image: "https://thispersondoesnotexist.com",
    winAmount: "$2,900",
    date: "1 day ago",
    badge: "VIP Player"
  },
  {
    id: 6,
    name: "David Kim",
    game: "Ninja's Fortune",
    rating: 5,
    review: "Amazing Asian-themed slot with great multipliers. The ninja bonus round is incredibly rewarding!",
    image: "https://thispersondoesnotexist.com",
    winAmount: "$2,100",
    date: "4 days ago",
    badge: "Elite Winner"
  }
];

const ReviewsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-32 overflow-hidden bg-[#0E0E0E]">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A]/50 via-[#0E0E0E]/50 to-[#1A1A1A]/50" />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
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

      {/* Content */}
      <div className="relative container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl font-bold bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] bg-clip-text text-transparent mb-6">
            Winners Circle
          </h2>
          <div className="flex justify-center gap-4 mb-8">
            <motion.div whileHover={{ scale: 1.1 }} className="px-6 py-2 rounded-full bg-[#FFB000]/20 text-[#FFCF9D]">
              <Trophy className="w-5 h-5 inline-block mr-2" />
              $50K+ Won Today
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} className="px-6 py-2 rounded-full bg-[#FFB000]/20 text-[#FFCF9D]">
              <Award className="w-5 h-5 inline-block mr-2" />
              500+ Winners
            </motion.div>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20, rotateX: -15, rotateY: -15 }}
              whileInView={{ 
                opacity: 1, 
                y: 0, 
                rotateX: hoveredIndex === index ? 5 : -15,
                rotateY: hoveredIndex === index ? 5 : -15
              }}
              whileHover={{ 
                scale: 1.05,
                rotateX: 5,
                rotateY: 5,
                z: 50
              }}
              transition={{ duration: 0.5 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative group"
            >
              {/* Card Background with Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFB000] to-[#FFCF9D] opacity-0 group-hover:opacity-10 blur-xl transition-opacity" />
              
              {/* Main Card */}
              <div className="relative bg-[#1A1A1A] rounded-2xl p-6 border border-[#FFB000]/20 group-hover:border-[#FFB000]/40 transform-gpu preserve-3d shadow-2xl">
                {/* Top Section */}
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform">
                      <Image
                        src={review.image}
                        alt={review.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <motion.div 
                      className="absolute -bottom-2 -right-2 bg-[#FFB000] text-black text-xs font-bold px-2 py-1 rounded-md transform rotate-12"
                      whileHover={{ scale: 1.1, rotate: 0 }}
                    >
                      {review.badge}
                    </motion.div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#FFB000] transition-colors">
                      {review.name}
                    </h3>
                    <p className="text-[#FFCF9D]/80 text-sm">{review.game}</p>
                    <div className="flex gap-1 text-[#FFB000] mt-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size="sm" variant={hoveredIndex === index ? 'sparkle' : 'default'} animated={hoveredIndex === index} />
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-[#FFB000] font-bold text-xl group-hover:scale-110 transform transition-transform">
                      {review.winAmount}
                    </div>
                    <div className="text-[#FFCF9D]/60 text-sm flex items-center justify-end gap-1">
                      <Clock className="w-3 h-3" />
                      {review.date}
                    </div>
                  </div>
                </div>

                {/* Review Text */}
                <div className="relative mt-4">
                  <p className="text-[#FFCF9D] italic">"{review.review}"</p>
                  <div className="absolute -top-2 -left-2 text-4xl text-[#FFB000]/20 font-serif">"</div>
                  <div className="absolute -bottom-4 -right-2 text-4xl text-[#FFB000]/20 font-serif">"</div>
                </div>

                {/* Bottom Badges */}
                <motion.div 
                  className="mt-6 flex items-center gap-2 flex-wrap"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                >
                  <motion.span 
                    className="bg-[#FFB000]/20 px-3 py-1 rounded-full text-sm text-[#FFCF9D] flex items-center gap-1"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Trophy className="w-4 h-4" />
                    Verified Win
                  </motion.span>
                  <motion.span 
                    className="bg-[#FFB000]/20 px-3 py-1 rounded-full text-sm text-[#FFCF9D] flex items-center gap-1"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Sparkles className="w-4 h-4" />
                    Featured
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
