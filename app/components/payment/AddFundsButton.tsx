'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';
import QuickPaymentDialog from './QuickPaymentDialog';

interface AddFundsButtonProps {
  userBalance: number;
  onPaymentComplete?: (amount: number, method: string) => void;
}

export default function AddFundsButton({ 
  userBalance,
  onPaymentComplete 
}: AddFundsButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handlePaymentSubmit = (amount: number, method: string) => {
    console.log(`Payment submitted: $${amount} via ${method}`);
    onPaymentComplete?.(amount, method);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsDialogOpen(true)}
        className="inline-flex items-center justify-center space-x-2 py-2 px-4
                   bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] 
                   text-black font-semibold rounded-lg transition-all duration-200
                   hover:shadow-lg hover:shadow-[#FFB000]/20"
      >
        <Wallet className="w-5 h-5" />
        <span>Add Funds</span>
      </motion.button>

      <QuickPaymentDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        userBalance={userBalance}
        onPaymentSubmit={handlePaymentSubmit}
      />
    </>
  );
}
