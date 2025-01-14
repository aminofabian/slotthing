'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Clock, Code, Paintbrush, Plus, RefreshCw, CheckCircle2, Circle, AlertCircle, Timer, ArrowUpRight } from 'lucide-react';
import Calendar from '../components/Calendar';

// Types for our changelog entries
type ChangelogEntry = {
  type: 'added' | 'changed' | 'visual' | 'upcoming';
  date?: string;
  title: string;
  description?: string;
  details?: string[];
};

// Type for tasks
type Task = {
  title: string;
  completed: boolean;
  category: 'Setup' | 'UI' | 'Feature' | 'Documentation' | 'Layout';
  priority: 'High' | 'Medium' | 'Low';
  timeEstimate: string;
  status: 'Completed' | 'In Progress' | 'Planned';
  date: string;
  accomplishments?: string[];
  notes?: string;
};

// Today's tasks
const todaysTasks: Task[] = [
  {
    title: "Fix Hero component layout and spacing issues",
    completed: true,
    category: "Layout",
    priority: "High",
    timeEstimate: "2h",
    status: "Completed",
    date: "2025-01-14",
    accomplishments: [
      "Fixed overlapping issues and mobile responsiveness"
    ],
    notes: "Fixed overlapping issues and mobile responsiveness"
  },
  {
    title: "Implement custom favicon and app icons",
    completed: true,
    category: "UI",
    priority: "Medium",
    timeEstimate: "1h",
    status: "Completed",
    date: "2025-01-14",
    accomplishments: [
      "Added SVG icon with brand colors"
    ],
    notes: "Added SVG icon with brand colors"
  },
  {
    title: "Create development log page",
    completed: true,
    category: "Feature",
    priority: "Medium",
    timeEstimate: "3h",
    status: "Completed",
    date: "2025-01-14",
    accomplishments: [
      "Added timeline and calendar filtering"
    ],
    notes: "Added timeline and calendar filtering"
  },
  {
    title: "Add calendar filtering to logs",
    completed: true,
    category: "Feature",
    priority: "Low",
    timeEstimate: "2h",
    status: "Completed",
    date: "2025-01-14",
    accomplishments: [],
    notes: ""
  },
  {
    title: "Optimize mobile responsiveness",
    completed: false,
    category: "Layout",
    priority: "High",
    timeEstimate: "4h",
    status: "In Progress",
    date: "2025-01-14",
    accomplishments: [],
    notes: "Working on hero section and game cards"
  },
  {
    title: "Implement user settings page",
    completed: false,
    category: "Feature",
    priority: "Medium",
    timeEstimate: "6h",
    status: "Planned",
    date: "2025-01-14",
    accomplishments: [],
    notes: "Need to design UI mockup first"
  }
];

// Week 1 tasks
const weekTasks: Task[] = [
  // Monday - January 13, 2025
  {
    title: "Initialize Next.js project with TypeScript",
    completed: true,
    category: "Setup",
    priority: "High",
    timeEstimate: "2h",
    status: "Completed",
    date: "2025-01-13",
    accomplishments: [
      "Created Next.js 13+ project with TypeScript",
      "Set up ESLint and Prettier",
      "Configured Tailwind CSS",
      "Added base project structure"
    ],
    notes: "Project foundation established with modern tooling"
  },
  {
    title: "Set up WebSocket/Socket.io configuration",
    completed: true,
    category: "Setup",
    priority: "High",
    timeEstimate: "3h",
    status: "Completed",
    date: "2025-01-13",
    accomplishments: [
      "Installed Socket.io client and server",
      "Created WebSocket connection manager",
      "Set up real-time event handlers",
      "Added connection status monitoring"
    ],
    notes: "Real-time infrastructure ready for game updates"
  },
  {
    title: "Configure performance monitoring",
    completed: true,
    category: "Setup",
    priority: "Medium",
    timeEstimate: "2h",
    status: "Completed",
    date: "2025-01-13",
    accomplishments: [
      "Integrated performance metrics tracking",
      "Set up error boundary system",
      "Added analytics events",
      "Configured logging system"
    ],
    notes: "Monitoring system in place for tracking app performance"
  },

  // Tuesday - January 14, 2025
  {
    title: "Implement mobile-first configuration",
    completed: false,
    category: "Setup",
    priority: "High",
    timeEstimate: "4h",
    status: "Planned",
    date: "2025-01-14",
    accomplishments: [],
    notes: "Focus on responsive breakpoints and mobile optimization"
  },
  {
    title: "Create development workflow documentation",
    completed: false,
    category: "Documentation",
    priority: "Medium",
    timeEstimate: "3h",
    status: "Planned",
    date: "2025-01-14",
    accomplishments: [],
    notes: "Document setup process and development guidelines"
  },

  // Wednesday - January 15, 2025
  {
    title: "Design and implement responsive homepage",
    completed: false,
    category: "UI",
    priority: "High",
    timeEstimate: "6h",
    status: "Planned",
    date: "2025-01-15",
    accomplishments: [],
    notes: "Create engaging landing page with responsive design"
  },
  {
    title: "Implement dark/light mode system",
    completed: false,
    category: "UI",
    priority: "Medium",
    timeEstimate: "3h",
    status: "Planned",
    date: "2025-01-15",
    accomplishments: [],
    notes: "Add theme switching with system preference detection"
  },

  // Thursday - January 16, 2025
  {
    title: "Set up component library",
    completed: false,
    category: "UI",
    priority: "High",
    timeEstimate: "4h",
    status: "Planned",
    date: "2025-01-16",
    accomplishments: [],
    notes: "Build reusable component system with Storybook"
  },
  {
    title: "Implement design system",
    completed: false,
    category: "UI",
    priority: "High",
    timeEstimate: "4h",
    status: "Planned",
    date: "2025-01-16",
    accomplishments: [],
    notes: "Create consistent design tokens and styling system"
  },

  // Friday - January 17, 2025
  {
    title: "Create logo and brand assets",
    completed: false,
    category: "UI",
    priority: "Medium",
    timeEstimate: "3h",
    status: "Planned",
    date: "2025-01-17",
    accomplishments: [],
    notes: "Design and implement brand identity elements"
  },
  {
    title: "Create dashboard layout and navigation",
    completed: false,
    category: "Feature",
    priority: "High",
    timeEstimate: "4h",
    status: "Planned",
    date: "2025-01-17",
    accomplishments: [],
    notes: "Build responsive dashboard framework"
  },
  {
    title: "Build statistics widgets",
    completed: false,
    category: "Feature",
    priority: "High",
    timeEstimate: "3h",
    status: "Planned",
    date: "2025-01-17",
    accomplishments: [],
    notes: "Create reusable dashboard widgets"
  }
];

// Our changelog data - now in reverse chronological order
const changelogData: ChangelogEntry[] = [
  {
    type: 'changed',
    date: '2025-01-14',
    title: 'Development Log Implementation',
    description: 'Added comprehensive development tracking system',
    details: [
      'Created logs page with timeline view',
      'Implemented calendar-based filtering',
      "Added today's tasks section",
      'Organized entries in reverse chronological order'
    ]
  },
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
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  // Get unique dates for the week
  const weekDates = {
    'Monday': '2025-01-13',
    'Tuesday': '2025-01-14',
    'Wednesday': '2025-01-15',
    'Thursday': '2025-01-16',
    'Friday': '2025-01-17'
  };

  // Filter tasks by day
  const filteredTasks = useMemo(() => {
    if (!selectedDay) return weekTasks;
    const selectedDate = weekDates[selectedDay as keyof typeof weekDates];
    return weekTasks.filter(task => task.date === selectedDate);
  }, [selectedDay]);

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-black mb-4 bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] bg-clip-text text-transparent">
            Week 1 Development Plan
          </h1>
          <p className="text-[#FFCF9D]/70 text-lg mb-2">
            January 13-17, 2025
          </p>
          <p className="text-[#FFCF9D]/70 text-lg">
            Project Setup, Core UI & Dashboard Framework
          </p>
        </div>

        {/* Day Filter */}
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          {Object.entries(weekDates).map(([day, date]) => (
            <button
              key={day}
              onClick={() => setSelectedDay(selectedDay === day ? null : day)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                ${selectedDay === day 
                  ? 'bg-[#FFB000] text-black' 
                  : 'bg-[#FFB000]/10 text-[#FFCF9D] hover:bg-[#FFB000]/20'}`}
            >
              {day} ({date})
            </button>
          ))}
        </div>

        {/* Tasks Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#FFB000]/20">
                <th className="px-4 py-3 text-left text-sm font-medium text-[#FFCF9D]/60">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#FFCF9D]/60">Task</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#FFCF9D]/60">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#FFCF9D]/60">Category</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#FFCF9D]/60">Priority</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#FFCF9D]/60">Est. Time</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#FFCF9D]/60">Accomplishments</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`border-b border-white/5 hover:bg-[#FFB000]/5 transition-colors
                    ${task.completed ? 'bg-[#FFB000]/5' : ''}`}
                >
                  <td className="px-4 py-4">
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-[#FFB000]" />
                    ) : (
                      <Circle className="w-5 h-5 text-[#FFCF9D]/40" />
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <span className={`font-medium ${task.completed ? 'text-[#FFCF9D]' : 'text-[#FFCF9D]/70'}`}>
                        {task.title}
                      </span>
                      {task.notes && (
                        <p className="text-sm text-[#FFCF9D]/50 mt-1">
                          {task.notes}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-[#FFCF9D]/70">
                      {task.date}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-[#FFB000]/10 text-[#FFCF9D]">
                      {task.category}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`flex items-center gap-1 text-sm
                      ${task.priority === 'High' ? 'text-red-400' : 
                        task.priority === 'Medium' ? 'text-yellow-400' : 
                        'text-green-400'}`}>
                      <AlertCircle className="w-4 h-4" />
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="flex items-center gap-1 text-sm text-[#FFCF9D]/60">
                      <Timer className="w-4 h-4" />
                      {task.timeEstimate}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {task.accomplishments && task.accomplishments.length > 0 ? (
                      <ul className="list-disc list-inside text-sm text-[#FFCF9D]/60 space-y-1">
                        {task.accomplishments.map((acc, i) => (
                          <li key={i}>{acc}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-sm text-[#FFCF9D]/40">Pending</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Progress Summary */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-[#FFCF9D] mb-4">Progress Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['Setup', 'UI', 'Feature', 'Documentation'].map((category) => {
              const categoryTasks = weekTasks.filter(t => t.category === category);
              const completedTasks = categoryTasks.filter(t => t.completed);
              const totalTime = categoryTasks.reduce((acc, task) => 
                acc + parseInt(task.timeEstimate), 0);
              const progress = (completedTasks.length / categoryTasks.length) * 100;
              
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-[#FFB000]/5 border border-[#FFB000]/20"
                >
                  <h4 className="text-lg font-medium text-[#FFCF9D] mb-2">{category}</h4>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-[#FFCF9D]/60">
                      {completedTasks.length}/{categoryTasks.length} tasks • {totalTime}h total
                    </p>
                    <div className="w-full h-2 bg-[#FFB000]/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-[#FFB000]"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
