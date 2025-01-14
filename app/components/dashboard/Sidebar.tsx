import React, { useState } from 'react';
import Link from 'next/link';
import { Wallet, ShoppingCart, Gamepad2, History, User, Store, Target, DollarSign, CreditCard, Award, Menu, X } from 'lucide-react';
import EnhancedPaymentPopup from '../payment/EnhancedPaymentPopup';
import CashoutPopup from '../cashout/CashoutPopup';

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
    className="group relative flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-all duration-300 overflow-hidden"
    onClick={onClick}
  >
    {/* Slanted background with gradient */}
    <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-purple-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:via-indigo-500/20 group-hover:to-purple-500/10 transition-all duration-500 opacity-0 group-hover:opacity-100 scale-x-[2] translate-x-full group-hover:translate-x-0" />
    
    {/* Glow effect */}
    <div className="absolute -inset-1 -skew-x-12 bg-gradient-to-r from-purple-500/0 to-indigo-500/0 group-hover:from-purple-500/20 group-hover:to-indigo-500/20 blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100" />

    {/* Content */}
    <div className="relative flex items-center gap-3 z-10">
      <div className="relative">
        <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center transition-all duration-500 group-hover:scale-[0.9] group-hover:-skew-x-12">
          <Icon className="w-5 h-5 text-gray-400 transition-colors duration-300 group-hover:text-purple-400" />
        </div>
        {/* Floating dots decoration */}
        <div className="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
        <div className="absolute -left-1 -bottom-1 w-2 h-2 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:-translate-x-1 group-hover:translate-y-1" />
      </div>
      <span className="text-gray-300 font-medium transition-all duration-300 group-hover:text-white group-hover:-skew-x-6">{label}</span>
    </div>
    {value !== undefined && (
      <div className="relative z-10">
        <span className="text-gray-200 font-medium transition-all duration-300 group-hover:text-white group-hover:-skew-x-6">{value}</span>
      </div>
    )}
  </Link>
);

interface MenuGroup {
  title: string;
  items: {
    icon: React.ElementType;
    label: string;
    href: string;
  }[];
}

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
  const [isPaymentPopupOpen, setIsPaymentPopupOpen] = useState(false);
  const [isCashoutPopupOpen, setIsCashoutPopupOpen] = useState(false);
  const stats = {
    balance: 0,
    inGames: 0,
    diamonds: 0,
    xp: 500,
  };

  const handlePurchaseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPaymentPopupOpen(true);
  };

  const handleCashoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsCashoutPopupOpen(true);
  };

  const handlePaymentSelect = (method: string) => {
    console.log('Selected payment method:', method);
    setIsPaymentPopupOpen(false);
  };

  const handleCashoutSelect = (method: string, amount: number) => {
    console.log('Cashout requested:', { method, amount });
    setIsCashoutPopupOpen(false);
  };

  const sidebarClasses = `
    fixed inset-y-0 left-0 z-50 w-72 bg-[#0E0E0E]/95 backdrop-blur-xl border-r border-white/10 flex flex-col
    transform transition-transform duration-500 ease-out
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    lg:translate-x-0 lg:static
  `;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={sidebarClasses}>
        {/* Header */}
        <div className="relative flex items-center justify-between p-6">
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <h2 className="text-xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
            Dashboard
          </h2>
          <button 
            onClick={onClose}
            className="lg:hidden w-8 h-8 flex items-center justify-center hover:bg-white/5 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        
        {/* Stats Section */}
        <div className="flex flex-col p-4 space-y-4">
          {/* Main Balance Card */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/50 to-indigo-500/50 rounded-2xl blur-xl transition-all duration-500 group-hover:opacity-100 opacity-75" />
            <div className="relative bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-4 overflow-hidden">
              <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-10" />
              <div className="relative">
                <div className="text-sm text-white/90">Total Balance</div>
                <div className="text-2xl font-bold text-white">${stats.balance}</div>
              </div>
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-indigo-500/0 group-hover:from-purple-500/20 group-hover:to-indigo-500/20 rounded-xl blur-lg transition-all duration-500" />
              <div className="relative bg-white/[0.03] hover:bg-white/[0.05] rounded-xl p-3 border border-white/5 transition-colors duration-300">
                <div className="text-xs text-gray-400">In Games</div>
                <div className="text-sm font-semibold text-white mt-0.5">${stats.inGames}</div>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-indigo-500/0 group-hover:from-purple-500/20 group-hover:to-indigo-500/20 rounded-xl blur-lg transition-all duration-500" />
              <div className="relative bg-white/[0.03] hover:bg-white/[0.05] rounded-xl p-3 border border-white/5 transition-colors duration-300">
                <div className="text-xs text-gray-400">Diamonds</div>
                <div className="text-sm font-semibold text-white mt-0.5">{stats.diamonds}</div>
              </div>
            </div>
            <div className="group relative col-span-2">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-indigo-500/0 group-hover:from-purple-500/20 group-hover:to-indigo-500/20 rounded-xl blur-lg transition-all duration-500" />
              <div className="relative bg-white/[0.03] hover:bg-white/[0.05] rounded-xl p-3 border border-white/5 transition-colors duration-300">
                <div className="text-xs text-gray-400">XP</div>
                <div className="text-sm font-semibold text-white mt-0.5">{stats.xp}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 pb-4">
          {menuGroups.map((group) => (
            <div key={group.title} className="mb-6">
              <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3 px-3 flex items-center">
                <span className="relative">
                  {group.title}
                  <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-purple-500/50 to-transparent" />
                </span>
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <SidebarItem
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    href={item.href}
                    onClick={
                      item.label === 'Purchase' 
                        ? handlePurchaseClick 
                        : item.label === 'Cashout'
                        ? handleCashoutClick
                        : undefined
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Payment Popup */}
      <EnhancedPaymentPopup
        isOpen={isPaymentPopupOpen}
        onClose={() => setIsPaymentPopupOpen(false)}
        amount={100}
        userBalance={stats.balance}
        onPaymentSelect={handlePaymentSelect}
        packageName="Standard Package"
        credits={1000}
        bonus={100}
      />

      {/* Cashout Popup */}
      <CashoutPopup
        isOpen={isCashoutPopupOpen}
        onClose={() => setIsCashoutPopupOpen(false)}
        userBalance={stats.balance}
        onCashoutSelect={handleCashoutSelect}
      />
    </>
  );
};

export default Sidebar;
