'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageSquare, User, Mail, Sparkles, Star, Zap } from 'lucide-react';

const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
    submitted: false,
    focused: ''
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [particles, setParticles] = useState<Array<{ x: number, y: number }>>([]);
  const [mounted, setMounted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const particleCount = 20;
    const initialParticles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * (window.innerWidth || 0),
      y: Math.random() * (window.innerHeight || 0)
    }));
    setParticles(initialParticles);

    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mounted]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (formRef.current) {
        const rect = formRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const form = formRef.current;
    if (form) {
      form.addEventListener('mousemove', handleMouseMove);
      return () => form.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  if (!mounted) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, submitted: true }));
    // Add your form submission logic here
  };

  const inputVariants = {
    focused: {
      scale: 1.02,
      y: -5,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    },
    unfocused: {
      scale: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    }
  };

  const particleCount = 20;

  return (
    <section className="relative min-h-screen py-32 overflow-hidden bg-[#0E0E0E]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A]/50 via-[#0E0E0E]/50 to-[#1A1A1A]/50" />
        
        {/* Slot Machine Reels Background Effect */}
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
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-6 h-6"
            initial={{ 
              x: particle.x,
              y: particle.y,
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
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="relative inline-block">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] bg-clip-text text-transparent mb-4">
              Jackpot Support
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
            Hit the jackpot with our 24/7 VIP support team! 🎰
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="relative bg-[#1A1A1A]/80 backdrop-blur-xl rounded-3xl p-8 border border-[#FFB000]/20 shadow-[0_0_50px_rgba(255,176,0,0.1)]"
            style={{
              perspective: '1000px',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Slot Machine Frame */}
            <div className="absolute inset-0 rounded-3xl border-8 border-[#FFB000]/10" />
            
            {/* Interactive Spotlight Effect */}
            <div 
              className="absolute inset-0 rounded-3xl opacity-20 pointer-events-none"
              style={{
                background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 176, 0, 0.3), transparent 25%)`
              }}
            />

            {/* Decorative Elements */}
            <div className="absolute -top-8 -right-8 w-16 h-16">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="w-full h-full bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] rounded-full flex items-center justify-center shadow-lg"
              >
                <MessageSquare className="w-8 h-8 text-black" />
              </motion.div>
            </div>

            <div className="absolute -bottom-6 -left-6 w-12 h-12">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, -360]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="w-full h-full bg-gradient-to-r from-[#FFCF9D] to-[#FFB000] rounded-full flex items-center justify-center shadow-lg"
              >
                <Zap className="w-6 h-6 text-black" />
              </motion.div>
            </div>

            {formState.submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-20 text-center"
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,176,0,0.3)]"
                >
                  <Sparkles className="w-12 h-12 text-black" />
                </motion.div>
                <h3 className="text-3xl font-bold text-[#FFCF9D] mb-4">🎰 Jackpot! Message Sent!</h3>
                <p className="text-[#FFCF9D]/70">Our VIP support team will be with you shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                {/* Input Fields */}
                <motion.div
                  variants={inputVariants}
                  animate={formState.focused === 'name' ? 'focused' : 'unfocused'}
                  className="relative"
                >
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FFB000]">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formState.name}
                    onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                    onFocus={() => setFormState(prev => ({ ...prev, focused: 'name' }))}
                    onBlur={() => setFormState(prev => ({ ...prev, focused: '' }))}
                    className="w-full bg-black/30 border-2 border-[#FFB000]/20 rounded-xl py-3 px-12 text-[#FFCF9D] placeholder-[#FFCF9D]/50 focus:border-[#FFB000]/50 focus:outline-none focus:ring-2 focus:ring-[#FFB000]/20 transition-all"
                  />
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-[#FFB000]/5 pointer-events-none"
                    animate={{
                      opacity: formState.focused === 'name' ? 1 : 0
                    }}
                  />
                </motion.div>

                <motion.div
                  variants={inputVariants}
                  animate={formState.focused === 'email' ? 'focused' : 'unfocused'}
                  className="relative"
                >
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FFB000]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formState.email}
                    onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                    onFocus={() => setFormState(prev => ({ ...prev, focused: 'email' }))}
                    onBlur={() => setFormState(prev => ({ ...prev, focused: '' }))}
                    className="w-full bg-black/30 border-2 border-[#FFB000]/20 rounded-xl py-3 px-12 text-[#FFCF9D] placeholder-[#FFCF9D]/50 focus:border-[#FFB000]/50 focus:outline-none focus:ring-2 focus:ring-[#FFB000]/20 transition-all"
                  />
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-[#FFB000]/5 pointer-events-none"
                    animate={{
                      opacity: formState.focused === 'email' ? 1 : 0
                    }}
                  />
                </motion.div>

                <motion.div
                  variants={inputVariants}
                  animate={formState.focused === 'message' ? 'focused' : 'unfocused'}
                  className="relative"
                >
                  <div className="absolute left-4 top-4 text-[#FFB000]">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <textarea
                    placeholder="Your Message"
                    value={formState.message}
                    onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                    onFocus={() => setFormState(prev => ({ ...prev, focused: 'message' }))}
                    onBlur={() => setFormState(prev => ({ ...prev, focused: '' }))}
                    rows={4}
                    className="w-full bg-black/30 border-2 border-[#FFB000]/20 rounded-xl py-3 px-12 text-[#FFCF9D] placeholder-[#FFCF9D]/50 focus:border-[#FFB000]/50 focus:outline-none focus:ring-2 focus:ring-[#FFB000]/20 transition-all resize-none"
                  />
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-[#FFB000]/5 pointer-events-none"
                    animate={{
                      opacity: formState.focused === 'message' ? 1 : 0
                    }}
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] text-black font-bold py-4 px-8 rounded-xl flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(255,176,0,0.3)] hover:shadow-[0_0_30px_rgba(255,176,0,0.5)] transition-all"
                >
                  <span>Send Message</span>
                  <Send className="w-5 h-5" />
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
