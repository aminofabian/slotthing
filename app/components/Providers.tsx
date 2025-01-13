'use client';

import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <div className="theme-provider-wrapper">
        {children}
      </div>
    </ThemeProvider>
  );
}
