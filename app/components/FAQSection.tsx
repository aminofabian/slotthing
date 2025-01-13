'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Sparkles, Zap, Shield, Coins, Clock, Star } from 'lucide-react';

interface FAQ {
  id: number;
  icon: React.ReactNode;
  question: string;
  answer: string;
  category: 'general' | 'security' | 'payments' | 'games';
  color: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    icon: <Shield className="w-6 h-6" />,
    question: "How secure is my data on the platform?",
    answer: "We employ state-of-the-art encryption and security measures to protect your data. All transactions are encrypted using 256-bit SSL technology, and we regularly conduct security audits to ensure the highest level of protection.",
    category: 'security',
    color: '#FFB000'
  },
  {
    id: 2,
    icon: <Coins className="w-6 h-6" />,
    question: "What payment methods are accepted?",
    answer: "We accept a wide range of payment methods including credit/debit cards, cryptocurrencies (Bitcoin, Ethereum), and various e-wallets. All transactions are processed instantly and securely.",
    category: 'payments',
    color: '#FF6B00'
  },
  {
    id: 3,
    icon: <Clock className="w-6 h-6" />,
    question: "How long do withdrawals take?",
    answer: "Withdrawal times vary by method: Crypto withdrawals are processed within 10 minutes, e-wallets within 24 hours, and bank transfers within 1-3 business days. VIP members enjoy expedited processing.",
    category: 'payments',
    color: '#FF9A00'
  },
  {
    id: 4,
    icon: <Star className="w-6 h-6" />,
    question: "What are the VIP benefits?",
    answer: "VIP members enjoy exclusive perks including higher limits, faster withdrawals, personal account manager, special bonuses, and access to VIP-only events and tournaments.",
    category: 'general',
    color: '#FFD700'
  },
  {
    id: 5,
    icon: <Zap className="w-6 h-6" />,
    question: "Are the games fair and tested?",
    answer: "Yes, all our games are certified by independent testing laboratories and use provably fair technology. You can verify each game's fairness through our transparent RNG system.",
    category: 'games',
    color: '#FFA500'
  }
];

const FAQCard = ({ faq, isOpen, onToggle, index }: { 
  faq: FAQ; 
  isOpen: boolean; 
  onToggle: () => void;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Floating Elements */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0, x: -20 }}
            className="absolute -left-4 top-1/2 -translate-y-1/2"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] flex items-center justify-center">
              {faq.icon}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        layout
        onClick={onToggle}
        className="relative bg-[#1A1A1A]/50 backdrop-blur-xl rounded-2xl p-6 cursor-pointer border border-[#FFB000]/20 group"
        style={{ perspective: '1000px' }}
        whileHover={{
          scale: 1.02,
          rotateX: 2,
          rotateY: 2,
          transition: { duration: 0.2 }
        }}
      >
        {/* Question */}
        <motion.div
          layout
          className="flex items-center justify-between"
        >
          <motion.h3 
            layout
            className="text-xl font-bold bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] bg-clip-text text-transparent pr-8"
          >
            {faq.question}
          </motion.h3>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-[#FFB000]"
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>

        {/* Answer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <motion.p
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="text-[#FFCF9D]/70 mt-4"
              >
                {faq.answer}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Background Glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at center, ${faq.color}40 0%, transparent 70%)`
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const FAQSection = () => {
  const [openId, setOpenId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<FAQ['category'] | 'all'>('all');
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const categories = [
    { id: 'all', label: 'All FAQs', icon: <HelpCircle className="w-5 h-5" /> },
    { id: 'general', label: 'General', icon: <Star className="w-5 h-5" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-5 h-5" /> },
    { id: 'payments', label: 'Payments', icon: <Coins className="w-5 h-5" /> },
    { id: 'games', label: 'Games', icon: <Zap className="w-5 h-5" /> },
  ];

  const filteredFaqs = faqs.filter(faq => 
    selectedCategory === 'all' ? true : faq.category === selectedCategory
  );

  return (
    <section className="relative py-32 overflow-hidden bg-[#0E0E0E]">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A]/50 via-[#0E0E0E]/50 to-[#1A1A1A]/50" />
        
        {/* Animated Particles */}
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

      <div className="container mx-auto px-4 relative" ref={containerRef}>
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-block mb-4"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] flex items-center justify-center">
              <HelpCircle className="w-8 h-8 text-black" />
            </div>
          </motion.div>
          <h2 className="text-6xl font-bold bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] bg-clip-text text-transparent mb-8">
            Frequently Asked Questions
          </h2>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id as FAQ['category'] | 'all')}
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

        {/* FAQ Cards */}
        <div className="max-w-3xl mx-auto space-y-6">
          <AnimatePresence mode="wait">
            {filteredFaqs.map((faq, index) => (
              <FAQCard
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
                index={index}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute -bottom-8 -right-8 w-16 h-16"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-r from-[#FFB000]/20 to-[#FFCF9D]/20 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-[#FFB000]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
