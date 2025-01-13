import React from 'react';
import Link from 'next/link';
import { Bell, Settings, Menu } from 'lucide-react';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  return (
    <nav className="h-16 bg-[#0E0E0E] border-b border-white/10 sticky top-0 z-40">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-white/5 rounded-lg lg:hidden"
          >
            <Menu className="w-5 h-5 text-gray-400" />
          </button>
          <Link href="/dashboard" className="text-lg sm:text-xl font-bold text-white">
            SlotThing
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button className="p-2 hover:bg-white/5 rounded-full">
            <Bell className="w-5 h-5 text-gray-400" />
          </button>
          <Link href="/dashboard/profile" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/10"></div>
          </Link>
          <button className="p-2 hover:bg-white/5 rounded-full">
            <Settings className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
