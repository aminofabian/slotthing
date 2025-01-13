import React from 'react';
import Link from 'next/link';
import { Wallet, ShoppingCart, Gamepad2, History, User, Store, Target, DollarSign, CreditCard, Award, Menu, X } from 'lucide-react';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  value?: string | number;
  href: string;
  onClick?: () => void;
}

interface MenuGroup {
  title: string;
  items: {
    icon: React.ElementType;
    label: string;
    href: string;
  }[];
}

const SidebarItem = ({ icon: Icon, label, value, href, onClick }: SidebarItemProps) => (
  <Link 
    href={href} 
    className="flex items-center justify-between p-2 sm:p-3 hover:bg-white/5 rounded-lg transition-colors"
    onClick={onClick}
  >
    <div className="flex items-center gap-3">
      <Icon className="w-5 h-5 text-gray-400" />
      <span className="text-gray-300">{label}</span>
    </div>
    {value !== undefined && <span className="text-gray-200 font-medium">{value}</span>}
  </Link>
);

const menuGroups: MenuGroup[] = [
  {
    title: 'Finances',
    items: [
      { icon: DollarSign, label: 'Purchase', href: '/dashboard/purchase' },
      { icon: Wallet, label: 'Cashout', href: '/dashboard/cashout' },
      { icon: CreditCard, label: 'Transactions', href: '/dashboard/transactions' },
    ]
  },
  {
    title: 'Gaming',
    items: [
      { icon: Gamepad2, label: 'Games', href: '/dashboard/games' },
      { icon: Target, label: 'Roulette', href: '/dashboard/roulette' },
      { icon: ShoppingCart, label: 'Draws', href: '/dashboard/draws' },
    ]
  },
  {
    title: 'Account',
    items: [
      { icon: User, label: 'Profile', href: '/dashboard/profile' },
      { icon: History, label: 'History', href: '/dashboard/history' },
      { icon: Award, label: 'Achievements', href: '/dashboard/achievements' },
    ]
  },
  {
    title: 'Store',
    items: [
      { icon: Store, label: 'Marketplace', href: '/dashboard/marketplace' },
    ]
  }
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const stats = {
    balance: 0,
    inGames: 0,
    diamonds: 0,
    xp: 500,
  };

  const sidebarClasses = `
    fixed inset-y-0 left-0 z-50 w-64 bg-[#0E0E0E] border-r border-white/10 flex flex-col
    transform transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    lg:translate-x-0 lg:static
  `;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={sidebarClasses}>
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-lg font-bold text-white">Dashboard</h2>
          <button 
            onClick={onClose}
            className="lg:hidden p-1 hover:bg-white/5 rounded-lg"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        
        <div className="flex flex-col p-4 space-y-3">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-4 text-white">
            <div className="text-sm opacity-90">Total Balance</div>
            <div className="text-2xl font-bold">${stats.balance}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-xs text-gray-400">In Games</div>
              <div className="text-sm font-semibold text-white">${stats.inGames}</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-xs text-gray-400">Diamonds</div>
              <div className="text-sm font-semibold text-white">{stats.diamonds}</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 col-span-2">
              <div className="text-xs text-gray-400">XP</div>
              <div className="text-sm font-semibold text-white">{stats.xp}</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          {menuGroups.map((group) => (
            <div key={group.title} className="mb-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
                {group.title}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <SidebarItem
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    href={item.href}
                    onClick={onClose}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
