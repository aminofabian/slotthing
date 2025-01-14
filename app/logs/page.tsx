'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Code, Paintbrush, Plus, RefreshCw } from 'lucide-react';

// Types for our changelog entries
type ChangelogEntry = {
  type: 'added' | 'changed' | 'visual' | 'upcoming';
  date?: string;
  title: string;
  description?: string;
  details?: string[];
};

// Our changelog data
const changelogData: ChangelogEntry[] = [
  {
    type: 'changed',
    date: '2025-01-14',
    title: 'Hero Component Layout Updates',
    description: 'Improved responsive design and spacing in the hero section',
    details: [
      'Fixed mobile layout issues',
      'Adjusted spacing between branding and stats',
      'Removed overlapping text in game slides',
      'Added proper margin for navbar spacing'
    ]
  },
  {
    type: 'visual',
    date: '2025-01-14',
    title: 'App Icons and Branding',
    description: 'Updated app icons and implemented PWA support',
    details: [
      'Added custom SVG icon with brand colors',
      'Implemented web manifest for PWA support',
      'Updated site metadata and theme colors'
    ]
  },
  {
    type: 'added',
    title: 'Initial Features',
    description: 'Core features implemented in the first development phase',
    details: [
      'Hero section with dynamic game slides',
      'Dashboard layout with game categories',
      'Dark/Light theme implementation',
      'Responsive navigation bar',
      'Footer component',
      'Contact form implementation',
      'Review section with testimonials',
      'Games section with filtering capability'
    ]
  },
  {
    type: 'upcoming',
    title: 'Planned Features',
    description: 'Features planned for the next release',
    details: [
      'User authentication system',
      'Real-time game stats',
      'Enhanced PWA capabilities',
      'Additional game categories',
      'Performance optimizations'
    ]
  }
];

// Icon mapping for entry types
const getIcon = (type: ChangelogEntry['type']) => {
  switch (type) {
    case 'added':
      return <Plus className="w-5 h-5" />;
    case 'changed':
      return <RefreshCw className="w-5 h-5" />;
    case 'visual':
      return <Paintbrush className="w-5 h-5" />;
    case 'upcoming':
      return <Code className="w-5 h-5" />;
    default:
      return null;
  }
};

// Color mapping for entry types
const getColors = (type: ChangelogEntry['type']) => {
  switch (type) {
    case 'added':
      return 'bg-green-500/10 text-green-500 border-green-500/20';
    case 'changed':
      return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    case 'visual':
      return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
    case 'upcoming':
      return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
    default:
      return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
  }
};

export default function LogsPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-black mb-4 bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] bg-clip-text text-transparent">
            Development Log
          </h1>
          <p className="text-[#FFCF9D]/70 text-lg">
            Tracking the evolution of SlotThing
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-4 sm:left-1/2 h-full w-0.5 bg-gradient-to-b from-[#FFB000]/50 to-transparent"></div>

          {/* Entries */}
          <div className="space-y-12">
            {changelogData.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative ${
                  index % 2 === 0 ? 'sm:pr-1/2' : 'sm:pl-1/2 sm:ml-auto'
                }`}
              >
                {/* Entry content */}
                <div className="relative sm:w-[calc(100%-2rem)] p-6 rounded-xl border backdrop-blur-xl transition-colors duration-300 hover:border-[#FFB000]/30"
                     style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                  {/* Type badge */}
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium mb-4 ${getColors(entry.type)}`}>
                    {getIcon(entry.type)}
                    <span className="capitalize">{entry.type}</span>
                  </div>

                  {/* Date if available */}
                  {entry.date && (
                    <div className="flex items-center gap-2 text-[#FFCF9D]/60 text-sm mb-2">
                      <Clock className="w-4 h-4" />
                      {entry.date}
                    </div>
                  )}

                  {/* Title and description */}
                  <h3 className="text-xl font-bold text-[#FFCF9D] mb-2">
                    {entry.title}
                  </h3>
                  {entry.description && (
                    <p className="text-[#FFCF9D]/70 mb-4">{entry.description}</p>
                  )}

                  {/* Details list */}
                  {entry.details && (
                    <ul className="space-y-2">
                      {entry.details.map((detail, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + idx * 0.1 }}
                          className="flex items-start gap-2 text-[#FFCF9D]/80"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#FFB000]" />
                          {detail}
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technical Stack */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-[#FFCF9D] mb-4">
            Technical Stack
          </h2>
          <div className="inline-flex flex-wrap justify-center gap-3">
            {[
              'Next.js 13+',
              'TypeScript',
              'Tailwind CSS',
              'Framer Motion',
              'Lucide Icons',
              'Context API'
            ].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="px-4 py-2 rounded-full bg-[#FFB000]/10 border border-[#FFB000]/20 text-[#FFCF9D]"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
