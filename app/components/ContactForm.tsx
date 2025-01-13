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
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

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
  const particles = Array.from({ length: particleCount });

  return (
    <section className="relative min-h-screen py-32 overflow-hidden bg-[#0E0E0E]">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A]/50 via-[#0E0E0E]/50 to-[#1A1A1A]/50" />
        
        {/* Animated Particles */}
        {particles.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#FFB000]"
            initial={{ 
              x: Math.random() * (dimensions.width || 0),
              y: Math.random() * (dimensions.height || 0),
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

      <div className="container mx-auto px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl font-bold bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] bg-clip-text text-transparent mb-4">
            Get in Touch
          </h2>
          <p className="text-[#FFCF9D]/70 text-lg max-w-2xl mx-auto">
            Have a question or need assistance? Our team is here to help you 24/7.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="relative bg-[#1A1A1A]/50 backdrop-blur-xl rounded-3xl p-8 border border-[#FFB000]/20"
            style={{
              perspective: '1000px',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Interactive Spotlight Effect */}
            <div 
              className="absolute inset-0 rounded-3xl opacity-20 pointer-events-none"
              style={{
                background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 176, 0, 0.15), transparent 25%)`
              }}
            />

            {/* Floating Icons */}
            <div className="absolute -top-6 -right-6 w-12 h-12">
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
                className="w-full h-full bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] rounded-full flex items-center justify-center"
              >
                <MessageSquare className="w-6 h-6 text-black" />
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
                  className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] rounded-full flex items-center justify-center"
                >
                  <Sparkles className="w-10 h-10 text-black" />
                </motion.div>
                <h3 className="text-2xl font-bold text-[#FFCF9D] mb-4">Message Sent Successfully!</h3>
                <p className="text-[#FFCF9D]/70">We'll get back to you as soon as possible.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
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
                    required
                    className="w-full h-14 bg-[#1A1A1A] rounded-xl pl-12 pr-4 text-[#FFCF9D] placeholder-[#FFCF9D]/50 border border-[#FFB000]/20 focus:border-[#FFB000] transition-all outline-none"
                    onFocus={() => setFormState(prev => ({ ...prev, focused: 'name' }))}
                    onBlur={() => setFormState(prev => ({ ...prev, focused: '' }))}
                    onChange={e => setFormState(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-[#FFB000]/5 -z-10"
                    animate={{
                      scale: formState.focused === 'name' ? 1.05 : 1
                    }}
                  />
                </motion.div>

                {/* Email Input */}
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
                    required
                    className="w-full h-14 bg-[#1A1A1A] rounded-xl pl-12 pr-4 text-[#FFCF9D] placeholder-[#FFCF9D]/50 border border-[#FFB000]/20 focus:border-[#FFB000] transition-all outline-none"
                    onFocus={() => setFormState(prev => ({ ...prev, focused: 'email' }))}
                    onBlur={() => setFormState(prev => ({ ...prev, focused: '' }))}
                    onChange={e => setFormState(prev => ({ ...prev, email: e.target.value }))}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-[#FFB000]/5 -z-10"
                    animate={{
                      scale: formState.focused === 'email' ? 1.05 : 1
                    }}
                  />
                </motion.div>

                {/* Message Input */}
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
                    required
                    rows={5}
                    className="w-full bg-[#1A1A1A] rounded-xl pl-12 pr-4 py-3 text-[#FFCF9D] placeholder-[#FFCF9D]/50 border border-[#FFB000]/20 focus:border-[#FFB000] transition-all outline-none resize-none"
                    onFocus={() => setFormState(prev => ({ ...prev, focused: 'message' }))}
                    onBlur={() => setFormState(prev => ({ ...prev, focused: '' }))}
                    onChange={e => setFormState(prev => ({ ...prev, message: e.target.value }))}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-[#FFB000]/5 -z-10"
                    animate={{
                      scale: formState.focused === 'message' ? 1.05 : 1
                    }}
                  />
                </motion.div>

                {/* Submit Button */}
                <div className="flex justify-center">
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
                          <Send className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform duration-300" />
                          <span className="absolute inset-0 bg-white/20 blur-sm rounded-lg"></span>
                        </span>
                        <span className="relative">
                          <span className="absolute -inset-1 bg-white/20 blur-sm rounded-lg"></span>
                          <span className="relative">SEND MESSAGE</span>
                        </span>
                      </span>
                    </div>
                  </motion.button>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-6 -left-6 w-12 h-12">
                  <motion.div
                    animate={{
                      rotate: [0, -360],
                      y: [0, 10, 0]
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="w-full h-full bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] rounded-full flex items-center justify-center"
                  >
                    <Star className="w-6 h-6 text-black" />
                  </motion.div>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
