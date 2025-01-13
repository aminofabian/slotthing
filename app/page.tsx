'use client'

import React from 'react';
import GamesSection from "./components/GamesSection";
import Star from "./components/Star"; 
import FAQSection from "./components/FAQSection"; 
import Footer from './components/Footer';
import Hero from './components/Hero';
import ContactForm from './components/ContactForm';
import ReviewsSection from './components/ReviewsSection';
import BlogSection from './components/BlogSection';

function Home() {
  return (
    <div className="bg-[#0E0E0E]">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-[url('/grid-pattern.png')] opacity-10" />
      <div className="fixed inset-0 bg-gradient-to-br from-[#0E0E0E]/50 via-[#1A1A1A]/50 to-[#0E0E0E]/50" />
      
      {/* Main Content */}
      <div className="relative z-10">        

        {/* Main Content Wrapper */}
        <main className="relative">
          {/* Decorative Side Elements */}
          <div className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 space-y-4">
            <div className="w-1 h-32 bg-gradient-to-b from-yellow-400/0 via-yellow-400 to-yellow-400/0" />
            <div className="w-1 h-32 bg-gradient-to-b from-yellow-400/0 via-yellow-400 to-yellow-400/0" />
          </div>
          
          <div className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 space-y-4">
            <div className="w-1 h-32 bg-gradient-to-b from-yellow-400/0 via-yellow-400 to-yellow-400/0" />
            <div className="w-1 h-32 bg-gradient-to-b from-yellow-400/0 via-yellow-400 to-yellow-400/0" />
          </div>

          {/* Hero Section */}
          <div className="max-w-[1920px] mx-auto">
            <Hero />
          </div>
          <GamesSection />
          <ReviewsSection />
          <BlogSection />
          <FAQSection />
          <section className="max-w-[1920px] mx-auto py-16 px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
            </h2>
            <ContactForm />
          </section>
          <Footer />

        </main>

        {/* Footer Glow Effect */}
        <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0E0E0E]/20 to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

export default Home;