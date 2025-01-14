'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  X as CloseIcon,
  Sparkles,
  Bitcoin,
  Smartphone,
  Apple,
  DollarSign,
  MessageCircle,
  Shield,
} from 'lucide-react';
import Image from 'next/image';

interface PaymentOption {
  id: string;
  name: string;
  icon: JSX.Element | string;
  description: string;
  isPopular?: boolean;
}

interface PaymentPopupProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onPaymentSelect: (method: string) => void;
}

const paymentOptions: PaymentOption[] = [
  {
    id: 'credit-card',
    name: 'Credit Card',
    icon: <CreditCard className="w-6 h-6" />,
    description: 'Pay securely with your credit card',
    isPopular: true,
  },
  {
    id: 'google-pay',
    name: 'Google Pay',
    icon: '/payment-icons/google-pay.svg',
    description: 'Fast checkout with Google Pay',
  },
  {
    id: 'apple-pay',
    name: 'Apple Pay',
    icon: <Apple className="w-6 h-6" />,
    description: 'Quick and secure Apple Pay',
  },
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    icon: <Bitcoin className="w-6 h-6" />,
    description: 'Pay with cryptocurrency',
  },
  {
    id: 'cashapp',
    name: 'Cash App',
    icon: <DollarSign className="w-6 h-6" />,
    description: 'Send money via Cash App',
  },
  {
    id: 'wechat',
    name: 'WeChat Pay',
    icon: <MessageCircle className="w-6 h-6" />,
    description: 'Pay with WeChat',
  },
];

export default function PaymentPopup({ isOpen, onClose, amount, onPaymentSelect }: PaymentPopupProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const handlePaymentSelect = (methodId: string) => {
    setSelectedMethod(methodId);
    onPaymentSelect(methodId);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50"
          >
            <div className="relative mx-4">
              {/* Content container */}
              <div className="relative backdrop-blur-xl bg-black/40 rounded-2xl border border-white/10 overflow-hidden">
                {/* Header */}
                <div className="relative p-6 pb-0">
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                      <CloseIcon className="w-5 h-5 text-[#FFCF9D]" />
                    </button>
                  </div>

                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-5 h-5 text-[#FFB000]" />
                    <h2 className="text-xl font-bold text-[#FFCF9D]">Choose Your Payment Quest</h2>
                  </div>
                  
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] bg-clip-text text-transparent">
                      ${amount}
                    </span>
                    <span className="text-[#FFCF9D]/60">USD</span>
                  </div>
                </div>

                {/* Payment options */}
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {paymentOptions.map((option) => (
                      <motion.button
                        key={option.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handlePaymentSelect(option.id)}
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
                            </div>
                            <p className="text-sm text-[#FFCF9D]/60 group-hover:text-[#FFCF9D]/80">
                              {option.description}
                            </p>
                          </div>
                        </div>

                        {/* Selection indicator */}
                        {selectedMethod === option.id && (
                          <motion.div
                            layoutId="selectedIndicator"
                            className="absolute inset-0 border-2 border-[#FFB000] rounded-xl pointer-events-none"
                            initial={false}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => selectedMethod && onPaymentSelect(selectedMethod)}
                    disabled={!selectedMethod}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 
                      ${selectedMethod
                        ? 'bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] text-black hover:shadow-lg hover:shadow-[#FFB000]/20'
                        : 'bg-white/10 text-white/60 cursor-not-allowed'
                      }`}
                  >
                    Continue with {selectedMethod ? paymentOptions.find(opt => opt.id === selectedMethod)?.name : 'Payment'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
