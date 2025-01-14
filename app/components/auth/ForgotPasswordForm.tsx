'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Shield, CheckCircle2, Gamepad2, Sparkles } from 'lucide-react';

interface ForgotPasswordFormProps {
  onSubmit: (email: string) => Promise<void>;
}

export default function ForgotPasswordForm({ onSubmit }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await onSubmit(email);
      setIsSuccess(true);
    } catch (error) {
      setError('Failed to send reset link. Please try again.');
      console.error('Password reset error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md"
    >
      <div className="relative backdrop-blur-xl bg-black/40 rounded-2xl border border-white/10 overflow-hidden">
        {/* Animated border gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] opacity-10" />

        {/* Header */}
        <div className="p-8 text-center relative">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative inline-block">
              <Shield className="w-12 h-12 text-[#FFB000] mx-auto mb-4" />
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4 text-[#FFCF9D]" />
              </motion.div>
            </div>
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] bg-clip-text text-transparent">
              Recover Account
            </h2>
            <p className="text-[#FFCF9D]/60">
              Lost your secret code? No worries, we'll help you get back in the game!
            </p>
          </motion.div>
        </div>

        {/* Form Content */}
        <div className="p-8 pt-0 relative">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form
                key="request-form"
                onSubmit={handleSubmit}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-[#FFCF9D]/80">
                    Player ID (Email)
                  </label>
                  <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FFCF9D]/40 group-hover:text-[#FFB000] transition-colors">
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
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-2"
                    >
                      {error}
                    </motion.p>
                  )}
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
                      <span className="ml-2">Sending...</span>
                    </div>
                  ) : (
                    'Send Recovery Link'
                  )}
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="success-message"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                className="text-center space-y-4"
              >
                <div className="flex justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                  >
                    <CheckCircle2 className="w-16 h-16 text-[#FFB000]" />
                  </motion.div>
                </div>
                <h3 className="text-xl font-semibold text-[#FFCF9D]">Recovery Link Sent!</h3>
                <p className="text-[#FFCF9D]/60">
                  Check your email for instructions to reset your password. The link will expire in 1 hour.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-[#FFCF9D]/60">
              Remember your password?{' '}
              <a href="/login" className="text-[#FFB000] hover:text-[#FFCF9D] transition-colors">
                Back to Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
