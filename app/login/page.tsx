'use client';

import { useRouter } from 'next/navigation';
import LoginForm from '../components/auth/LoginForm';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    // TODO: Implement actual login logic
    console.log('Login attempt:', { email, password });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Redirect to dashboard after successful login
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-[#FFB000]/20" />

      {/* Animated background shapes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        className="absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-[#FFB000]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-[#FFCF9D]/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Content */}
      <div className="relative w-full flex flex-col items-center justify-center gap-8">
        {/* Logo or branding */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl font-black mb-2 bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] bg-clip-text text-transparent">
            SlotThing
          </h1>
          <p className="text-[#FFCF9D]/60">
            Your Ultimate Gaming Destination
          </p>
        </motion.div>

        {/* Login Form */}
        <LoginForm onSubmit={handleLogin} />

        {/* Footer links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-sm text-[#FFCF9D]/40 space-x-4"
        >
          <a href="#" className="hover:text-[#FFCF9D] transition-colors">Terms of Service</a>
          <span>•</span>
          <a href="#" className="hover:text-[#FFCF9D] transition-colors">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:text-[#FFCF9D] transition-colors">Support</a>
        </motion.div>
      </div>
    </div>
  );
}
