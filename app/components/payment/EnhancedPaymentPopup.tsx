'use client';

import React, { useState } from 'react';
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
  Wallet,
  ChevronRight,
  Coins,
  Zap,
  Gift
} from 'lucide-react';
import Image from 'next/image';

interface PaymentOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  isPopular?: boolean;
  processingFee?: string;
  minAmount?: number;
  maxAmount?: number;
  iconBgColor?: string;
}

interface EnhancedPaymentPopupProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  userBalance: number;
  onPaymentSelect: (method: string) => void;
  packageName: string;
  credits: number;
  bonus: number;
}

const paymentOptions: PaymentOption[] = [
  {
    id: 'credit-card',
    name: 'Credit Card',
    icon: <CreditCard className="w-6 h-6" />,
    description: 'Fast and secure payment with any credit card',
    isPopular: true,
    processingFee: '2.9% + $0.30',
    iconBgColor: 'bg-blue-500/20'
  },
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    icon: <Bitcoin className="w-6 h-6" />,
    description: 'Pay with cryptocurrency',
    processingFee: '1%',
    iconBgColor: 'bg-orange-500/20'
  },
  {
    id: 'apple-pay',
    name: 'Apple Pay',
    icon: <Apple className="w-6 h-6" />,
    description: 'Quick payment with Apple Pay',
    processingFee: '2%',
    iconBgColor: 'bg-gray-800/20'
  },
  {
    id: 'cash-app',
    name: 'Cash App',
    icon: <DollarSign className="w-6 h-6" />,
    description: 'Send money directly through Cash App',
    processingFee: '1.5%',
    iconBgColor: 'bg-green-500/20'
  },
  {
    id: 'wechat',
    name: 'WeChat Pay',
    icon: <MessageCircle className="w-6 h-6" />,
    description: 'Pay with WeChat',
    processingFee: '2%',
    iconBgColor: 'bg-emerald-500/20'
  },
  {
    id: 'alipay',
    name: 'Alipay',
    icon: <Wallet className="w-6 h-6" />,
    description: 'Pay with Alipay',
    processingFee: '2%',
    iconBgColor: 'bg-blue-600/20'
  }
];

const EnhancedPaymentPopup = ({ 
  isOpen, 
  onClose, 
  amount, 
  userBalance,
  onPaymentSelect,
  packageName,
  credits,
  bonus
}: EnhancedPaymentPopupProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-[#0E0E0E] border border-white/10"
          >
            {/* Header */}
            <div className="relative p-6 pb-4">
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                    Select Payment Method
                  </h2>
                  <p className="mt-1 text-gray-400">
                    Choose your preferred way to pay
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <CloseIcon className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Package Details */}
            <div className="px-6 py-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                      <Coins className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{packageName}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-400">{credits} Credits</span>
                        {bonus > 0 && (
                          <>
                            <span className="text-sm text-gray-600">+</span>
                            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/20">
                              <Sparkles className="w-3 h-3 text-purple-400" />
                              <span className="text-xs font-medium text-purple-400">+{bonus} Bonus</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">${amount}</div>
                    <div className="text-sm text-gray-400">Total Amount</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {paymentOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setSelectedOption(option.id);
                      onPaymentSelect(option.id);
                    }}
                    className={`
                      relative group p-4 rounded-xl border transition-all duration-300
                      ${selectedOption === option.id 
                        ? 'border-purple-500/50 bg-purple-500/10' 
                        : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                      }
                    `}
                  >
                    {/* Background Effects */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl" />
                    </div>

                    <div className="relative flex items-start gap-4">
                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-lg ${option.iconBgColor} flex items-center justify-center`}>
                        {typeof option.icon === 'string' 
                          ? <Image src={option.icon} alt={option.name} width={24} height={24} />
                          : option.icon
                        }
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white">{option.name}</span>
                          {option.isPopular && (
                            <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 text-xs font-medium">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-gray-400">{option.description}</p>
                        {option.processingFee && (
                          <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                            <Shield className="w-3 h-3" />
                            <span>Processing fee: {option.processingFee}</span>
                          </div>
                        )}
                      </div>

                      <ChevronRight className={`
                        w-5 h-5 transition-all duration-300
                        ${selectedOption === option.id ? 'text-purple-400' : 'text-gray-600'}
                      `} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Security Note */}
            <div className="px-6 pb-6">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Shield className="w-4 h-4" />
                <span>All payments are secure and encrypted</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnhancedPaymentPopup;
