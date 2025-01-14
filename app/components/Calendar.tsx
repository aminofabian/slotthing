'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type CalendarProps = {
  activeDates: string[];
  selectedDate: string | null;
  onDateSelect: (date: string | null) => void;
};

export default function Calendar({ activeDates, selectedDate, onDateSelect }: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const formatDate = (day: number): string => {
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const formattedDay = day.toString().padStart(2, '0');
    return `${currentDate.getFullYear()}-${month}-${formattedDay}`;
  };

  const isActiveDate = (date: string): boolean => {
    return activeDates.includes(date);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-12">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4 px-4">
        <button
          onClick={previousMonth}
          className="p-2 rounded-lg hover:bg-[#FFB000]/10 text-[#FFCF9D] transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <h2 className="text-xl font-bold text-[#FFCF9D]">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        
        <button
          onClick={nextMonth}
          className="p-2 rounded-lg hover:bg-[#FFB000]/10 text-[#FFCF9D] transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-sm font-medium text-[#FFCF9D]/60 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for days before the first day of the month */}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}

        {/* Calendar days */}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const date = formatDate(day);
          const isActive = isActiveDate(date);
          const isSelected = date === selectedDate;

          return (
            <motion.button
              key={day}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDateSelect(isSelected ? null : date)}
              className={`
                aspect-square rounded-lg text-sm font-medium
                transition-colors duration-200 relative
                ${isActive 
                  ? 'bg-[#FFB000]/20 hover:bg-[#FFB000]/30 text-[#FFCF9D]' 
                  : 'text-[#FFCF9D]/40 cursor-default'}
                ${isSelected ? 'ring-2 ring-[#FFB000] ring-offset-2 ring-offset-black' : ''}
              `}
              disabled={!isActive}
            >
              {day}
              {isActive && (
                <motion.div
                  layoutId="activeDot"
                  className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full
                    ${isSelected ? 'bg-[#FFB000]' : 'bg-[#FFCF9D]/60'}`}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Clear Filter Button */}
      {selectedDate && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          onClick={() => onDateSelect(null)}
          className="mt-4 px-4 py-2 text-sm text-[#FFCF9D]/60 hover:text-[#FFCF9D] transition-colors mx-auto block"
        >
          Clear Filter
        </motion.button>
      )}
    </div>
  );
}
