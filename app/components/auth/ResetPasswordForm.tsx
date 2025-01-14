'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Eye, EyeOff, Shield, CheckCircle2, Sparkles } from 'lucide-react';

interface ResetPasswordFormProps {
  onSubmit: (password: string, confirmPassword: string) => Promise<void>;
}

export default function ResetPasswordForm({ onSubmit }: ResetPasswordFormProps) {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [powerLevel, setPowerLevel] = useState(0);

  // Calculate power level based on password strength
  useEffect(() => {
    let strength = 0;
    if (formData.password.length >= 8) strength += 25;
    if (formData.password.match(/[A-Z]/)) strength += 25;
    if (formData.password.match(/[0-9]/)) strength += 25;
    if (formData.password.match(/[^A-Za-z0-9]/)) strength += 25;
    setPowerLevel(strength);
  }, [formData.password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    if (powerLevel < 75) {
      setError('Password not strong enough! Power up your password with more characters, numbers, and symbols!');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      await onSubmit(formData.password, formData.confirmPassword);
      setIsSuccess(true);
    } catch (error) {
      setError('Failed to reset password. Please try again.');
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
              Create New Password
            </h2>
            <p className="text-[#FFCF9D]/60">
              Power up your account with a new secret code!
            </p>
          </motion.div>
        </div>

        {/* Form Content */}
        <div className="p-8 pt-0 relative">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form
                key="reset-form"
                onSubmit={handleSubmit}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-6"
              >
                {/* Password strength indicator */}
                <div className="text-center">
                  <motion.div
                    className="text-sm"
                    animate={{ color: powerLevel >= 75 ? '#FFB000' : '#FFCF9D' }}
                  >
                    Password Power Level: {powerLevel}%
                  </motion.div>
                </div>

                <div className="space-y-4">
                  {/* New Password */}
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-[#FFCF9D]/80">
                      New Secret Code
                    </label>
                    <div className="relative group">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FFCF9D]/40 group-hover:text-[#FFB000] transition-colors">
                        <Lock className="w-full h-full" />
                      </div>
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        required
                        className="w-full pl-10 pr-12 py-3 bg-black/40 border border-white/10 rounded-lg 
                                focus:outline-none focus:ring-2 focus:ring-[#FFB000]/50 focus:border-transparent 
                                text-[#FFCF9D] placeholder-[#FFCF9D]/30 transition-all
                                group-hover:border-[#FFB000]/30"
                        placeholder="Create new password"
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

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#FFCF9D]/80">
                      Confirm Secret Code
                    </label>
                    <div className="relative group">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FFCF9D]/40 group-hover:text-[#FFB000] transition-colors">
                        <Lock className="w-full h-full" />
                      </div>
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        required
                        className="w-full pl-10 pr-12 py-3 bg-black/40 border border-white/10 rounded-lg 
                                focus:outline-none focus:ring-2 focus:ring-[#FFB000]/50 focus:border-transparent 
                                text-[#FFCF9D] placeholder-[#FFCF9D]/30 transition-all
                                group-hover:border-[#FFB000]/30"
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FFCF9D]/40 hover:text-[#FFCF9D]/60 transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm"
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
                      <span className="ml-2">Powering Up...</span>
                    </div>
                  ) : (
                    'Power Up Account'
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
                <h3 className="text-xl font-semibold text-[#FFCF9D]">Password Reset Complete!</h3>
                <p className="text-[#FFCF9D]/60">
                  Your account has been powered up with a new password. Ready to continue your adventure?
                </p>
                <motion.a
                  href="/login"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block w-full py-3 px-4 bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] 
                          text-black font-semibold rounded-lg transition-all duration-200
                          hover:shadow-lg hover:shadow-[#FFB000]/20"
                >
                  Return to Login
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
