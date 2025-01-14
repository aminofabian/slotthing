'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import EnhancedPaymentPopup from './EnhancedPaymentPopup';

interface PurchaseButtonProps {
  amount: number;
  packageName: string;
  credits: number;
  bonus: number;
  onPurchaseComplete?: (paymentMethod: string) => void;
}

export default function PurchaseButton({ 
  amount, 
  packageName,
  credits,
  bonus,
  onPurchaseComplete 
}: PurchaseButtonProps) {
  const [isPaymentPopupOpen, setIsPaymentPopupOpen] = useState(false);
  // TODO: Get actual user balance from your user context/state
  const userBalance = 75.50; // Example balance

  const handlePaymentSelect = (method: string) => {
    // Handle the payment method selection
    console.log('Selected payment method:', method);
    onPurchaseComplete?.(method);
    setIsPaymentPopupOpen(false);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsPaymentPopupOpen(true)}
        className="inline-flex items-center justify-center w-full space-x-2 py-3 px-6 
                   bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] 
                   text-black font-semibold rounded-lg transition-all duration-200
                   hover:shadow-lg hover:shadow-[#FFB000]/20"
      >
        <ShoppingCart className="w-5 h-5" />
        <span>Purchase Now - ${amount}</span>
      </motion.button>

      <EnhancedPaymentPopup
        isOpen={isPaymentPopupOpen}
        onClose={() => setIsPaymentPopupOpen(false)}
        amount={amount}
        userBalance={userBalance}
        onPaymentSelect={handlePaymentSelect}
        packageName={packageName}
        credits={credits}
        bonus={bonus}
      />
    </>
  );
}
