'use client';
import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles, Crown, Coins, Gift, Zap, Star } from 'lucide-react';
import Image from 'next/image';
import ContactForm from './ContactForm';

interface FAQItemProps {
  question: string;
  answer: string;
  image: string;
  isActive: boolean;
  onClick: () => void;
}

const FAQItem = ({ question, answer, image, isActive, onClick }: FAQItemProps) => {
  return (
    <button
      className={`w-full text-left rounded-xl transition-all duration-300 group
        ${isActive 
          ? 'bg-gradient-to-r from-yellow-400/10 via-orange-500/10 to-red-500/10 border-yellow-400/30' 
          : 'bg-purple-900/30 hover:bg-purple-800/30 border-yellow-400/10'} 
        border backdrop-blur-sm`}
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white group-hover:text-yellow-400 transition-colors">
            {question}
          </h3>
          <ChevronDown
            className={`w-5 h-5 text-yellow-400 transition-transform duration-300 
              ${isActive ? 'rotate-180' : 'rotate-0'}`}
          />
        </div>
        {isActive && <FAQContent answer={answer} image={image} />}
      </div>
    </button>
  );
};

const FAQContent = ({ answer, image }: { answer: string; image: string }) => {
  return (
    <div className="mt-4 space-y-4 animate-fadeIn">
      <div className="relative w-full h-48 rounded-xl overflow-hidden">
        <Image
          src={image}
          alt="FAQ illustration"
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <p className="text-gray-300 leading-relaxed">
        {answer}
      </p>
    </div>
  );
};

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    {
      question: "How do I start playing?",
      answer: "Getting started is easy! Simply click the 'Play Now' button, create an account, and make your first deposit. You'll receive welcome bonuses and free spins to begin your gaming adventure. Our user-friendly interface will guide you through the process, and you can start playing your favorite slots in minutes.",
      image: "/images/faq/getting-started.jpg"
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept a wide range of payment methods including credit cards, cryptocurrencies (Bitcoin, Ethereum), e-wallets (PayPal, Skrill), and bank transfers. All transactions are secure and encrypted. Choose the method that works best for you and start playing instantly.",
      image: "/images/faq/payment-methods.jpg"
    },
    {
      question: "How long do withdrawals take?",
      answer: "Withdrawal times vary by method: Cryptocurrency withdrawals are instant, e-wallets take 0-24 hours, and bank transfers typically take 1-3 business days. VIP members enjoy faster processing times. We prioritize quick and secure payouts for all our players.",
      image: "/images/faq/withdrawals.jpg"
    },
    {
      question: "Are the games fair?",
      answer: "Yes, all our games use certified Random Number Generators (RNG) and are regularly audited by independent testing agencies. We maintain strict fairness standards and display all game RTPs. Our commitment to fair play is unwavering, and we're fully licensed and regulated.",
      image: "/images/faq/fair-gaming.jpg"
    },
    {
      question: "What are the wagering requirements for bonuses?",
      answer: "Bonus wagering requirements vary by promotion. Typically, welcome bonuses have a 35x wagering requirement. Full details are always clearly displayed in the bonus terms and conditions. We believe in transparency and make sure you understand all bonus terms.",
      image: "/images/faq/bonus-terms.jpg"
    },
    {
      question: "How do I become a VIP member?",
      answer: "VIP status is earned through regular play. As you play, you'll earn points and progress through our loyalty tiers. Each tier offers better rewards, faster withdrawals, and exclusive bonuses. Our VIP program is designed to reward our most loyal players with the best possible gaming experience.",
      image: "/images/faq/vip-program.jpg"
    }
  ];

  return (
    <section className="py-32 px-4 relative overflow-hidden min-h-screen flex items-center">
      {/* Hexagon Pattern Background */}
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L55 20V40L30 55L5 40V20L30 5Z' fill='none' stroke='rgba(234, 179, 8, 0.1)' stroke-width='1'/%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }} />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950 via-purple-900 to-purple-950" style={{ opacity: '0.97' }} />

      {/* Animated Slot Symbols */}
      <div className="absolute w-full h-full overflow-hidden">
        <div className="absolute top-20 left-[10%] animate-float-slow">
          <Sparkles className="w-8 h-8 text-yellow-400/20" />
        </div>
        <div className="absolute top-40 right-[15%] animate-float-delayed">
          <Crown className="w-10 h-10 text-yellow-400/20" />
        </div>
        <div className="absolute bottom-32 left-[20%] animate-float">
          <Coins className="w-12 h-12 text-yellow-400/20" />
        </div>
        <div className="absolute top-1/2 right-[25%] animate-float-slow">
          <Gift className="w-8 h-8 text-yellow-400/20" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-r from-yellow-400/10 via-orange-500/10 to-red-500/10 border border-yellow-400/20 backdrop-blur-sm">
            <HelpCircle className="w-8 h-8 text-yellow-400" />
          </div>
          <div className="relative">
            <h2 className="text-5xl font-bold text-white">
              Frequently Asked Questions
            </h2>
            <div className="absolute -top-6 -right-6 animate-pulse">
              <Star width={24} height={24} />
            </div>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Find answers to common questions about our platform, games, and services.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Questions Column */}
          <div className="space-y-4 relative">
            {/* Glowing border effect */}
            <div className="absolute inset-0 -m-6 rounded-3xl bg-gradient-to-r from-yellow-400/5 via-orange-500/5 to-red-500/5 blur-lg" />
            <div className="absolute inset-0 -m-6 rounded-3xl border border-yellow-400/10 backdrop-blur-sm" />
            
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                image={faq.image}
                isActive={activeIndex === index}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>

          {/* Active Question Preview */}
          <div className="hidden lg:block">
            <div className="sticky top-8">
              <div className="relative p-6 rounded-3xl overflow-hidden">
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-purple-800/50 backdrop-blur-xl border border-yellow-400/10" />
                {/* Content */}
                <div className="relative">
                  <FAQContent 
                    answer={faqs[activeIndex].answer}
                    image={faqs[activeIndex].image}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Support Section */}
        <div className="mt-20">
          <div className="max-w-2xl mx-auto relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-red-500/20 rounded-3xl blur-xl" />
            
            <div className="relative p-8 rounded-3xl bg-purple-900/30 backdrop-blur-sm border border-yellow-400/10">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-2xl font-bold text-white">Get in Touch</h3>
                </div>
                <p className="text-gray-300 text-lg">
                  Have a specific question? We're here to help!
                </p>
              </div>
              
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
