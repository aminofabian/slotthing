'use client';

import { motion } from 'framer-motion';
import { CreditCard, Wallet, Sparkles } from 'lucide-react';
import PurchaseButton from '@/app/components/payment/PurchaseButton';

interface PurchaseOption {
  id: string;
  name: string;
  amount: number;
  credits: number;
  bonus: number;
  isPopular?: boolean;
  description?: string;
}

const purchaseOptions: PurchaseOption[] = [
  {
    id: 'starter',
    name: 'Starter Pack',
    amount: 9.99,
    credits: 1000,
    bonus: 100,
    description: 'Perfect for beginners',
  },
  {
    id: 'popular',
    name: 'Power Pack',
    amount: 49.99,
    credits: 5500,
    bonus: 1000,
    isPopular: true,
    description: 'Most popular choice',
  },
  {
    id: 'premium',
    name: 'Elite Pack',
    amount: 99.99,
    credits: 12000,
    bonus: 3000,
    description: 'Best value for pros',
  }
];

export default function PurchasePage() {
  const handlePurchaseComplete = (paymentMethod: string) => {
    // TODO: Handle the purchase completion
    console.log(`Purchase completed with ${paymentMethod}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] bg-clip-text text-transparent">
          Power Up Your Game
        </h1>
        <p className="text-[#FFCF9D]/60">
          Choose your power pack and enhance your gaming experience
        </p>
      </div>

      {/* Purchase Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {purchaseOptions.map((option) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="relative backdrop-blur-xl bg-black/40 rounded-2xl border border-white/10 overflow-hidden"
          >
            {/* Popular badge */}
            {option.isPopular && (
              <div className="absolute top-4 right-4">
                <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-[#FFB000]/10 border border-[#FFB000]/20">
                  <Sparkles className="w-4 h-4 text-[#FFB000]" />
                  <span className="text-sm font-medium text-[#FFB000]">Popular</span>
                </div>
              </div>
            )}

            <div className="p-6">
              {/* Package details */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-[#FFCF9D] mb-2">{option.name}</h3>
                <p className="text-[#FFCF9D]/60 text-sm">{option.description}</p>
              </div>

              {/* Price and credits */}
              <div className="mb-6">
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] bg-clip-text text-transparent">
                    ${option.amount}
                  </span>
                  <span className="ml-2 text-[#FFCF9D]/60">USD</span>
                </div>

                {/* Credits info */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Wallet className="w-5 h-5 text-[#FFB000]" />
                    <span className="text-[#FFCF9D]">{option.credits.toLocaleString()} Credits</span>
                  </div>
                  {option.bonus > 0 && (
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-5 h-5 text-[#FFB000]" />
                      <span className="text-[#FFCF9D]">+{option.bonus.toLocaleString()} Bonus</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Purchase button */}
              <PurchaseButton
                amount={option.amount}
                packageName={option.name}
                credits={option.credits}
                bonus={option.bonus}
                onPurchaseComplete={handlePurchaseComplete}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Security notice */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 text-[#FFCF9D]/60">
          <CreditCard className="w-4 h-4" />
          <span className="text-sm">Secure payment processing</span>
        </div>
      </div>
    </div>
  );
}
