'use client';

import React, { useState, JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X as CloseIcon,
  Wallet,
  Bitcoin,
  Clock,
  AlertCircle,
  DollarSign,
  ChevronRight,
  Shield,
  Info,
  Banknote
} from 'lucide-react';

interface CashoutOption {
  id: string;
  name: string;
  icon: JSX.Element;
  description: string;
  minAmount: number;
  maxAmount: number;
  processingTime: string;
  processingFee: string;
  iconBgColor: string;
  operatingHours: string;
}

interface CashoutPopupProps {
  isOpen: boolean;
  onClose: () => void;
  userBalance: number;
  onCashoutSelect: (method: string, amount: number) => void;
}

const cashoutOptions: CashoutOption[] = [
  {
    id: 'ach',
    name: 'ACH Bank Transfer',
    icon: <Banknote className="w-6 h-6" />,
    description: 'Direct transfer to your bank account',
    minAmount: 50,
    maxAmount: 300,
    processingTime: 'Up to 24 hours',
    processingFee: '1%',
    iconBgColor: 'bg-blue-500/20',
    operatingHours: '10 am to 10 pm (Eastern Time)'
  },
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    icon: <Bitcoin className="w-6 h-6" />,
    description: 'Withdraw to your Bitcoin wallet',
    minAmount: 50,
    maxAmount: 600,
    processingTime: 'Up to 24 hours',
    processingFee: '2%',
    iconBgColor: 'bg-orange-500/20',
    operatingHours: '10 am to 10 pm (Eastern Time)'
  }
];

const CashoutPopup = ({ 
  isOpen, 
  onClose, 
  userBalance,
  onCashoutSelect
}: CashoutPopupProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleAmountChange = (value: string) => {
    setError('');
    if (value === '') {
      setAmount('');
      return;
    }
    
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;
    
    const selectedMethod = cashoutOptions.find(opt => opt.id === selectedOption);
    if (!selectedMethod) return;

    if (numValue > userBalance) {
      setError('Amount exceeds your balance');
    } else if (numValue < selectedMethod.minAmount) {
      setError(`Minimum amount is $${selectedMethod.minAmount}`);
    } else if (numValue > selectedMethod.maxAmount) {
      setError(`Maximum amount is $${selectedMethod.maxAmount}`);
    }

    setAmount(value);
  };

  const handleSubmit = () => {
    if (!selectedOption || !amount || error) return;
    
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) return;
    
    onCashoutSelect(selectedOption, numAmount);
    onClose();
  };

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
                    Cashout
                  </h2>
                  <p className="mt-1 text-gray-400">
                    Choose your preferred withdrawal method
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

            {/* Balance Info */}
            <div className="px-6 py-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                      <Wallet className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Available Balance</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-2xl font-bold text-white">${userBalance.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Processing Time Notice */}
            <div className="px-6">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <Clock className="w-5 h-5 text-yellow-500" />
                <p className="text-sm text-yellow-200">
                  Cashouts have a processing time and are not instant. It can take up to 24 hours to receive your funds.
                </p>
              </div>
            </div>

            {/* Cashout Options */}
            <div className="px-6 py-6">
              <div className="space-y-4">
                {cashoutOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setSelectedOption(option.id);
                      setError('');
                    }}
                    className={`
                      relative group w-full p-4 rounded-xl border transition-all duration-300
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
                        {option.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white">{option.name}</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-400">{option.description}</p>
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{option.processingTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Info className="w-3 h-3" />
                            <span>Min. ${option.minAmount} - Max. ${option.maxAmount}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            <span>Fee: {option.processingFee}</span>
                          </div>
                        </div>
                        <div className="mt-1 text-xs text-gray-600">
                          {option.operatingHours}
                        </div>
                      </div>

                      <ChevronRight className={`
                        w-5 h-5 transition-all duration-300
                        ${selectedOption === option.id ? 'text-purple-400' : 'text-gray-600'}
                      `} />
                    </div>
                  </button>
                ))}
              </div>

              {/* Amount Input */}
              {selectedOption && (
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Amount to Cashout
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={amount}
                      onChange={(e) => handleAmountChange(e.target.value)}
                      className="block w-full pl-10 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                      placeholder="Enter amount"
                    />
                  </div>
                  {error && (
                    <div className="mt-2 flex items-center gap-1 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{error}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {selectedOption && (
              <div className="px-6 pb-6">
                <button
                  onClick={handleSubmit}
                  disabled={!amount || !!error}
                  className={`
                    w-full py-3 px-4 rounded-xl font-medium transition-all duration-300
                    ${(!amount || !!error)
                      ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                      : 'bg-purple-500 hover:bg-purple-600 text-white'
                    }
                  `}
                >
                  Request Cashout
                </button>
              </div>
            )}

            {/* Security Note */}
            <div className="px-6 pb-6">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Shield className="w-4 h-4" />
                <span>All transactions are secure and encrypted</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CashoutPopup;
