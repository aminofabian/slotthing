'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  X as CloseIcon,
  Sparkles,
  Bitcoin,
  Apple,
  DollarSign,
  MessageCircle,
  Shield,
  Wallet,
  Zap,
  AlertCircle
} from 'lucide-react';
import Image from 'next/image';

interface PaymentOption {
  id: string;
  name: string;
  icon: React.ReactNode | string;
  description: string;
  isPopular?: boolean;
  processingFee?: string;
  minAmount?: number;
  maxAmount?: number;
  instantDeposit?: boolean;
}

interface QuickPaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userBalance: number;
  onPaymentSubmit: (amount: number, method: string) => void;
}

const paymentOptions: PaymentOption[] = [
  {
    id: 'credit-card',
    name: 'Credit Card',
    icon: <CreditCard className="w-6 h-6" />,
    description: 'Instant deposit with major cards',
    isPopular: true,
    processingFee: '2.5%',
    instantDeposit: true
  },
  {
    id: 'google-pay',
    name: 'Google Pay',
    icon: '/payment-icons/google-pay.svg',
    description: 'Quick checkout with Google Pay',
    processingFee: '1.5%',
    instantDeposit: true
  },
  {
    id: 'apple-pay',
    name: 'Apple Pay',
    icon: <Apple className="w-6 h-6" />,
    description: 'Secure Apple Pay checkout',
    processingFee: '1.5%',
    instantDeposit: true
  },
  {
    id: 'bitcoin',
    name: 'Crypto',
    icon: <Bitcoin className="w-6 h-6" />,
    description: 'BTC, ETH, USDT accepted',
    processingFee: '0%',
    minAmount: 20
  },
  {
    id: 'cashapp',
    name: 'Cash App',
    icon: <DollarSign className="w-6 h-6" />,
    description: 'Pay with Cash App',
    processingFee: '1%',
    instantDeposit: true
  },
  {
    id: 'wechat',
    name: 'WeChat Pay',
    icon: <MessageCircle className="w-6 h-6" />,
    description: 'Popular in Asia',
    processingFee: '2%'
  },
];

export default function QuickPaymentDialog({ 
  isOpen, 
  onClose, 
  userBalance,
  onPaymentSubmit,
}: QuickPaymentDialogProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleAmountChange = (value: string) => {
    // Only allow numbers and decimals
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
      setError('');
    }
  };

  const handleSubmit = () => {
    const numAmount = parseFloat(amount);
    if (!amount || isNaN(numAmount)) {
      setError('Please enter a valid amount');
      return;
    }
    if (!selectedMethod) {
      setError('Please select a payment method');
      return;
    }
    
    const selectedOption = paymentOptions.find(opt => opt.id === selectedMethod);
    if (selectedOption?.minAmount && numAmount < selectedOption.minAmount) {
      setError(`Minimum amount for ${selectedOption.name} is $${selectedOption.minAmount}`);
      return;
    }

    onPaymentSubmit(numAmount, selectedMethod);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with particles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          >
            {/* Animated particles */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 0,
                  scale: 0,
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight
                }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
                className="absolute w-2 h-2 bg-[#FFB000]/20 rounded-full"
              />
            ))}
          </motion.div>

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50"
          >
            <div className="relative mx-4">
              <div className="relative backdrop-blur-xl bg-black/40 rounded-2xl border border-white/10 overflow-hidden">
                {/* Power level indicator */}
                <motion.div
                  className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[#FFB000] to-[#FFCF9D]"
                  initial={{ width: 0 }}
                  animate={{ width: selectedMethod ? '100%' : '0%' }}
                  transition={{ duration: 0.5 }}
                />

                {/* Close button */}
                <div className="absolute top-4 right-4">
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <CloseIcon className="w-5 h-5 text-[#FFCF9D]" />
                  </button>
                </div>

                {/* Header */}
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Shield className="w-5 h-5 text-[#FFB000]" />
                    <h2 className="text-xl font-bold text-[#FFCF9D]">Add Funds</h2>
                  </div>

                  {/* Balance */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center space-x-2">
                      <Wallet className="w-5 h-5 text-[#FFB000]" />
                      <span className="text-[#FFCF9D]/60">Current Balance</span>
                    </div>
                    <span className="text-[#FFCF9D] font-bold">${userBalance.toFixed(2)}</span>
                  </div>

                  {/* Amount Input */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-[#FFCF9D]/80 mb-2">
                      Enter Amount
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-[#FFCF9D]/60">$</span>
                      </div>
                      <input
                        type="text"
                        value={amount}
                        onChange={(e) => handleAmountChange(e.target.value)}
                        className="w-full pl-8 pr-4 py-3 bg-black/40 border border-white/10 rounded-lg 
                                focus:outline-none focus:ring-2 focus:ring-[#FFB000]/50 focus:border-transparent 
                                text-[#FFCF9D] placeholder-[#FFCF9D]/30"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment options */}
                <div className="p-6 pt-0 space-y-4">
                  <label className="block text-sm font-medium text-[#FFCF9D]/80">
                    Select Payment Method
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {paymentOptions.map((option) => (
                      <motion.button
                        key={option.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedMethod(option.id)}
                        className={`relative group p-4 rounded-xl border transition-all duration-200
                          ${selectedMethod === option.id
                            ? 'bg-[#FFB000]/10 border-[#FFB000]'
                            : 'bg-black/20 border-white/5 hover:border-[#FFB000]/50'
                          }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            {typeof option.icon === 'string' ? (
                              <Image
                                src={option.icon}
                                alt={option.name}
                                width={24}
                                height={24}
                                className="w-6 h-6"
                              />
                            ) : (
                              option.icon
                            )}
                          </div>
                          <div className="flex-1 text-left">
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-[#FFCF9D] group-hover:text-[#FFB000]">
                                {option.name}
                              </span>
                              {option.isPopular && (
                                <div className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-[#FFB000]/10 border border-[#FFB000]/20">
                                  <Sparkles className="w-3 h-3 text-[#FFB000]" />
                                  <span className="text-xs text-[#FFB000]">Popular</span>
                                </div>
                              )}
                              {option.instantDeposit && (
                                <div className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-[#FFB000]/10 border border-[#FFB000]/20">
                                  <Zap className="w-3 h-3 text-[#FFB000]" />
                                  <span className="text-xs text-[#FFB000]">Instant</span>
                                </div>
                              )}
                            </div>
                            <p className="text-sm text-[#FFCF9D]/60 group-hover:text-[#FFCF9D]/80">
                              {option.description}
                            </p>
                            {option.processingFee && (
                              <p className="text-xs text-[#FFCF9D]/40 mt-1">
                                Processing fee: {option.processingFee}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Error message */}
                {error && (
                  <div className="px-6 pb-0">
                    <div className="flex items-center space-x-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{error}</span>
                    </div>
                  </div>
                )}

                {/* Submit button */}
                <div className="p-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    className="w-full py-3 px-4 rounded-lg font-semibold
                             bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] 
                             text-black hover:shadow-lg hover:shadow-[#FFB000]/20
                             transition-all duration-200"
                  >
                    Continue
                  </motion.button>

                  <div className="flex items-center justify-center space-x-2 text-[#FFCF9D]/60 mt-4">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm">Secure payment processing</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
