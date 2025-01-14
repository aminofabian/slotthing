'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, Gamepad2, Sparkles } from 'lucide-react';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginStage, setLoginStage] = useState(0);
  const [particles, setParticles] = useState<Array<{ x: number; y: number; size: number; color: string }>>([]);
  const [powerLevel, setPowerLevel] = useState(0);

  // Generate random particles for the background effect
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      color: `hsl(${Math.random() * 60 + 30}, 100%, 50%)`
    }));
    setParticles(newParticles);
  }, []);

  // Calculate power level based on password strength
  useEffect(() => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[A-Z]/)) strength += 25;
    if (password.match(/[0-9]/)) strength += 25;
    if (password.match(/[^A-Za-z0-9]/)) strength += 25;
    setPowerLevel(strength);
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(email, password);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setLoginStage(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md relative"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full"
            animate={{
              x: [particle.x + '%', particle.x + 10 + '%', particle.x + '%'],
              y: [particle.y + '%', particle.y + 10 + '%', particle.y + '%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.1,
            }}
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              filter: 'blur(1px)',
            }}
          />
        ))}
      </div>

      {/* Main container */}
      <div className="relative backdrop-blur-xl bg-black/40 rounded-2xl border border-white/10 overflow-hidden">
        {/* Power level indicator */}
        <motion.div
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[#FFB000] to-[#FFCF9D]"
          initial={{ width: 0 }}
          animate={{ width: `${powerLevel}%` }}
          transition={{ duration: 0.5 }}
        />

        {/* Header */}
        <div className="p-8 text-center relative">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative inline-block">
              <Gamepad2 className="w-12 h-12 text-[#FFB000] mx-auto mb-4" />
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4 text-[#FFCF9D]" />
              </motion.div>
            </div>
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] bg-clip-text text-transparent">
              Player Login
            </h2>
            <p className="text-[#FFCF9D]/60">
              Ready to continue your adventure?
            </p>
          </motion.div>
        </div>

        {/* Login form with stages */}
        <div className="p-8 pt-0">
          <AnimatePresence mode="wait">
            {loginStage === 0 ? (
              <motion.form
                key="email-stage"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                onSubmit={handleEmailNext}
              >
                <div className="space-y-4">
                  <div className="relative group">
                    <label htmlFor="email" className="block text-sm font-medium text-[#FFCF9D]/80 mb-2 transition-colors group-hover:text-[#FFB000]">
                      Player ID (Email)
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FFCF9D]/40 transition-colors group-hover:text-[#FFB000]">
                        <Mail className="w-full h-full" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-lg 
                                focus:outline-none focus:ring-2 focus:ring-[#FFB000]/50 focus:border-transparent 
                                text-[#FFCF9D] placeholder-[#FFCF9D]/30 transition-all
                                group-hover:border-[#FFB000]/30"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 px-4 bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] 
                            text-black font-semibold rounded-lg transition-all duration-200
                            hover:shadow-lg hover:shadow-[#FFB000]/20"
                  >
                    Continue Quest
                  </motion.button>
                </div>
              </motion.form>
            ) : (
              <motion.form
                key="password-stage"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="relative group">
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="password" className="block text-sm font-medium text-[#FFCF9D]/80 transition-colors group-hover:text-[#FFB000]">
                      Secret Code
                    </label>
                    <motion.div
                      className="text-xs"
                      animate={{ color: powerLevel >= 75 ? '#FFB000' : '#FFCF9D' }}
                    >
                      Power Level: {powerLevel}%
                    </motion.div>
                  </div>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FFCF9D]/40 transition-colors group-hover:text-[#FFB000]">
                      <Lock className="w-full h-full" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-10 pr-12 py-3 bg-black/40 border border-white/10 rounded-lg 
                              focus:outline-none focus:ring-2 focus:ring-[#FFB000]/50 focus:border-transparent 
                              text-[#FFCF9D] placeholder-[#FFCF9D]/30 transition-all
                              group-hover:border-[#FFB000]/30"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FFCF9D]/40 hover:text-[#FFCF9D]/60 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input
                        id="remember"
                        type="checkbox"
                        className="w-4 h-4 rounded border-white/10 bg-black/40 text-[#FFB000] focus:ring-[#FFB000]/50"
                      />
                      <label htmlFor="remember" className="text-sm text-[#FFCF9D]/60">
                        Save Progress
                      </label>
                    </div>
                    <button
                      type="button"
                      onClick={() => setLoginStage(0)}
                      className="text-sm text-[#FFB000] hover:text-[#FFCF9D] transition-colors"
                    >
                      Change ID
                    </button>
                  </div>
                  
                  <div className="text-center">
                    <motion.a
                      href="/forgot-password"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-sm text-[#FFB000] hover:text-[#FFCF9D] transition-colors relative inline-block group"
                    >
                      <span>Lost your secret code?</span>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] transition-all duration-300 group-hover:w-full"></span>
                    </motion.a>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 
                          ${isLoading 
                            ? 'bg-white/10 text-white/60 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] text-black hover:shadow-lg hover:shadow-[#FFB000]/20'
                          }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <motion.div
                        className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span className="ml-2">Loading...</span>
                    </div>
                  ) : (
                    'Begin Adventure'
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-[#FFCF9D]/60">
              New to the game?{' '}
              <a href="/signup" className="text-[#FFB000] hover:text-[#FFCF9D] transition-colors">
                Create Account
              </a>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
