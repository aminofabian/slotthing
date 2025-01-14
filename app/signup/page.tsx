'use client';

import { useRouter } from 'next/navigation';
import SignUpForm from '../components/auth/SignUpForm';
import { motion } from 'framer-motion';

export default function SignUpPage() {
  const router = useRouter();

  const handleSignUp = async (formData: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dateOfBirth: string;
    phone: string;
    address?: string;
    referralEmail?: string;
    games?: string[];
  }) => {
    // TODO: Implement actual sign up logic
    console.log('Sign up attempt:', formData);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Redirect to dashboard after successful sign up
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative mt-16 overflow-hidden bg-[#0A0A0A]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-[#FFB000] rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-[#FFCF9D] rounded-full blur-3xl"
        />
      </div>

      {/* Content container */}
      <div className="relative w-full max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left side - Branding and features */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:w-1/2 text-center lg:text-left space-y-8"
        >
          <div>
            <h1 className="text-5xl lg:text-7xl font-black mb-4 bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] bg-clip-text text-transparent">
              Join the Elite
            </h1>
            <p className="text-xl lg:text-2xl text-[#FFCF9D]/60">
              Experience gaming like never before
            </p>
          </div>

          {/* Feature list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {[
              { title: "Exclusive Access", desc: "Be the first to play new releases" },
              { title: "Premium Rewards", desc: "Earn points with every game" },
              { title: "Community Events", desc: "Join tournaments and competitions" },
              { title: "24/7 Support", desc: "We're here when you need us" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#FFB000]/30 transition-colors"
              >
                <h3 className="text-lg font-semibold text-[#FFB000] mb-2">{feature.title}</h3>
                <p className="text-[#FFCF9D]/60">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right side - Sign Up Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:w-1/2"
        >
          <SignUpForm onSubmit={handleSignUp} />
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative w-full text-center py-6 text-sm text-[#FFCF9D]/40 space-x-4"
      >
        <a href="#" className="hover:text-[#FFCF9D] transition-colors">Terms of Service</a>
        <span>•</span>
        <a href="#" className="hover:text-[#FFCF9D] transition-colors">Privacy Policy</a>
        <span>•</span>
        <a href="#" className="hover:text-[#FFCF9D] transition-colors">Support</a>
      </motion.footer>
    </div>
  );
}
