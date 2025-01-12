import React from 'react';
import TournamentHero from "./components/HeroSection";
import GamesSection from "./components/GamesSection";
import Star from "./components/Star"; 
import FAQSection from "./components/FAQSection"; 
import Footer from './components/Footer'; // Assuming the Footer component is in a separate file

function Home() {
  return (
    <div className="bg-purple-950">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-[url('/grid-pattern.png')] opacity-10" />
      <div className="fixed inset-0 bg-gradient-to-br from-purple-950/50 via-purple-900/50 to-purple-950/50" />
      
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
            <TournamentHero />
          </div>

          {/* New Games Section */}
          <section className="max-w-[1920px] mx-auto py-16 px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
              New Releases
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-xl p-6 border-2 border-yellow-400/20 hover:border-yellow-400/40 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">New Game {index + 1}</h3>
                    <span className="text-yellow-400">
                      <Star className="w-6 h-6 inline-block" />
                    </span>
                  </div>
                  <div className="flex gap-1 text-yellow-400">
                    {[...Array(5)].map((_, starIndex) => (
                      <Star key={starIndex} className="w-5 h-5" />
                    ))}
                  </div>
                  <p className="text-purple-200 mt-4">Experience the thrill of our latest slot machine with amazing rewards!</p>
                </div>
              ))}
            </div>
          </section>

          <GamesSection />
          <FAQSection />
          <Footer />

        </main>

        {/* Footer Glow Effect */}
        <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

export default Home;