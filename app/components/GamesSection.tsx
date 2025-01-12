import React from 'react';
import Image from 'next/image';

interface Game {
  title: string;
  description: string;
  imageUrl: string;
  provider: string;
}

const games: Game[] = [
  {
    title: "Panda Master",
    description: "Experience the mystical world of pandas in this enchanting game",
    imageUrl: "/games/panda-master.jpg",
    provider: "Premium"
  },
  {
    title: "VBlink",
    description: "Fast-paced action with stunning visual effects",
    imageUrl: "/games/vblink.jpg",
    provider: "Featured"
  },
  {
    title: "Orion Stars",
    description: "Journey through the cosmos for stellar wins",
    imageUrl: "/games/orion-stars.jpg",
    provider: "Popular"
  },
  {
    title: "Golden Treasure",
    description: "Discover ancient riches and golden opportunities",
    imageUrl: "/games/golden-treasure.jpg",
    provider: "New"
  },
  {
    title: "Egames",
    description: "Collection of exciting electronic gaming experiences",
    imageUrl: "/games/egames.jpg",
    provider: "Featured"
  },
  {
    title: "Milk Way",
    description: "Explore the galaxy of endless possibilities",
    imageUrl: "/games/milk-way.jpg",
    provider: "Premium"
  },
  {
    title: "Juwa",
    description: "Traditional games with a modern twist",
    imageUrl: "/games/juwa.jpg",
    provider: "Popular"
  }
];

const GameCard = ({ game, index }: { game: Game; index: number }) => (
  <div className={`group relative ${index % 2 === 0 ? 'translate-y-8' : ''}`}>
    <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-purple-950/50 to-purple-900/30 backdrop-blur-sm border border-yellow-400/10 p-6 transition-all duration-500 hover:scale-[1.02] hover:border-yellow-400/30 hover:translate-y-[-0.5rem]">
      {/* Decorative corner shapes */}
      <div className="absolute top-0 right-0 w-24 h-24 transform translate-x-12 -translate-y-12">
        <div className="absolute inset-0 rotate-45 bg-gradient-to-r from-yellow-400/20 to-transparent blur-2xl" />
      </div>
      <div className="absolute bottom-0 left-0 w-32 h-32 transform -translate-x-16 translate-y-16">
        <div className="absolute inset-0 rotate-45 bg-gradient-to-r from-purple-600/30 to-transparent blur-2xl" />
      </div>

      {/* Game Image Container */}
      <div className="aspect-[16/9] relative overflow-hidden rounded-2xl transform transition-transform duration-700 group-hover:scale-[1.02]">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-950 via-purple-900/50 to-transparent z-10" />
        <Image
          src={game.imageUrl}
          alt={game.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Animated overlay shapes */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-xl transform -translate-x-16 -translate-y-16 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-1000" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-600/20 rounded-full blur-xl transform translate-x-24 translate-y-24 group-hover:translate-x-8 group-hover:translate-y-8 transition-transform duration-1000" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-6 relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="relative inline-block">
              <span className="absolute inset-0 animate-ping rounded-full bg-yellow-400/20"></span>
              <span className="relative inline-block px-4 py-1.5 text-xs font-bold text-yellow-400 bg-yellow-400/10 rounded-full border border-yellow-400/20">
                {game.provider}
              </span>
            </span>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 rounded-full bg-yellow-400/20 blur group-hover:bg-yellow-400/30 transition-colors duration-300"></div>
            <div className="relative h-8 w-8 rounded-full bg-purple-900/50 border border-yellow-400/20 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">{game.title}</h3>
        <p className="mt-2 text-sm text-gray-400 line-clamp-2">{game.description}</p>
        <button className="relative mt-6 w-full overflow-hidden rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-3 text-sm font-bold text-purple-950 transition-all duration-300 hover:from-yellow-500 hover:to-yellow-600 hover:shadow-lg hover:shadow-yellow-400/20 transform hover:-translate-y-0.5">
          <span className="relative z-10">Play Now</span>
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-yellow-400/0 via-yellow-400/30 to-yellow-400/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        </button>
      </div>
    </div>
  </div>
);

export default function GamesSection() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/50 via-purple-900/30 to-purple-950/50" />
      
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Hexagon Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill-opacity='0.1' fill='%23FCD34D' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      {/* Top and Bottom Borders with animated gradient */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent animate-gradient-x"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent animate-gradient-x"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block">
            <h2 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 mb-6 relative">
              Featured Games
              <div className="absolute -top-8 -right-8 w-16 h-16">
                <div className="absolute inset-0 rotate-45 bg-yellow-400/20 rounded-lg blur-lg animate-pulse"></div>
              </div>
              <div className="absolute -bottom-8 -left-8 w-16 h-16">
                <div className="absolute inset-0 rotate-45 bg-purple-600/30 rounded-lg blur-lg animate-pulse animation-delay-500"></div>
              </div>
            </h2>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Discover our collection of premium games with incredible rewards and endless entertainment
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {games.map((game, index) => (
            <GameCard key={index} game={game} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
