'use client';

import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0E0E0E]">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-[url('/grid-pattern.png')] opacity-10" />
      <div className="fixed inset-0 bg-gradient-to-br from-[#0E0E0E]/50 via-[#1A1A1A]/50 to-[#0E0E0E]/50" />
      
      <div className="relative z-10 flex">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex-1">
          <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
          <main className="lg:ml-64 min-h-screen">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
