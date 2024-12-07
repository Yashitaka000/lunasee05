import React, { useState } from 'react';
import { CalendarDay, CyclePhase } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cycleInfo } from '../utils/cycleData';
import { CycleInfoModal } from './CycleInfoModal';

interface CalendarProps {
  days: CalendarDay[];
}

export function Calendar({ days }: CalendarProps) {
  const [monthOffset, setMonthOffset] = useState(0);
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);
  const weekDays = ['日', '月', '火', '水', '木', '金', '土'];
  
  const currentDate = new Date();
  const displayDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + monthOffset,
    1
  );

  const getColorForPhase = (phase: CyclePhase, isOvulationDay: boolean) => {
    if (isOvulationDay) return 'bg-red-400 dark:bg-red-500/60 hover:bg-red-500 dark:hover:bg-red-400/70';
    
    switch (phase) {
      case 'menstrual':
        return 'bg-white dark:bg-gray-100/90 hover:bg-gray-50 dark:hover:bg-white/95';
      case 'follicular':
        return 'bg-yellow-100 dark:bg-yellow-900/40 hover:bg-yellow-200 dark:hover:bg-yellow-800/50';
      case 'ovulation':
        return 'bg-pink-200 dark:bg-pink-900/40 hover:bg-pink-300 dark:hover:bg-pink-800/50';
      case 'luteal':
        return 'bg-purple-200 dark:bg-purple-900/40 hover:bg-purple-300 dark:hover:bg-purple-800/50';
    }
  };

  const getTextColorForPhase = (phase: CyclePhase, isOvulationDay: boolean) => {
    if (isOvulationDay) return 'text-white dark:text-white';
    
    switch (phase) {
      case 'menstrual':
        return 'text-gray-900 dark:text-gray-900';
      case 'follicular':
        return 'text-yellow-900 dark:text-yellow-100';
      case 'ovulation':
        return 'text-pink-900 dark:text-pink-100';
      case 'luteal':
        return 'text-purple-900 dark:text-purple-100';
    }
  };

  const getPhaseName = (phase: CyclePhase, isOvulationDay: boolean) => {
    if (isOvulationDay) return '排卵日';
    
    switch (phase) {
      case 'menstrual':
        return '生理';
      case 'follicular':
        return '卵胞期';
      case 'ovulation':
        return '排卵期';
      case 'luteal':
        return '黄体期';
    }
  };

  const formatMonth = (date: Date) => {
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long'
    }).format(date);
  };

  const daysInMonth = days.filter(day => {
    const dayDate = day.date;
    return dayDate.getMonth() === displayDate.getMonth() &&
           dayDate.getFullYear() === displayDate.getFullYear();
  });

  const firstDayOfMonth = new Date(displayDate.getFullYear(), displayDate.getMonth(), 1).getDay();
  const prevMonthDays = Array(firstDayOfMonth).fill(null);

  return (
    <>
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setMonthOffset(prev => prev - 1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            {formatMonth(displayDate)}
          </h2>
          <button
            onClick={() => setMonthOffset(prev => prev + 1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day) => (
            <div key={day} className="text-center font-medium text-gray-600 dark:text-gray-300 p-2">
              {day}
            </div>
          ))}
          
          {prevMonthDays.map((_, index) => (
            <div key={`prev-${index}`} className="p-2 text-center opacity-30">
            </div>
          ))}
          
          {daysInMonth.map((day, index) => (
            <button
              key={index}
              onClick={() => setSelectedDay(day)}
              className={`p-2 text-center rounded-lg ${getColorForPhase(
                day.phase,
                day.isOvulationDay
              )} backdrop-blur-sm transition-all hover:scale-105`}
            >
              <span className={`block text-lg font-medium ${getTextColorForPhase(day.phase, day.isOvulationDay)}`}>
                {day.date.getDate()}
              </span>
              <span className={`text-xs mt-1 block font-medium ${getTextColorForPhase(day.phase, day.isOvulationDay)}`}>
                {getPhaseName(day.phase, day.isOvulationDay)}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-4 justify-end">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-gray-100">
            <div className="w-3 h-3 rounded-full bg-white border border-gray-300"></div>
            <span className="text-sm text-gray-900">生理</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-50 dark:bg-yellow-900/20">
            <div className="w-3 h-3 rounded-full bg-yellow-200"></div>
            <span className="text-sm text-yellow-700 dark:text-yellow-300">卵胞期</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-50 dark:bg-pink-900/20">
            <div className="w-3 h-3 rounded-full bg-pink-200"></div>
            <span className="text-sm text-pink-700 dark:text-pink-300">排卵期</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/20">
            <div className="w-3 h-3 rounded-full bg-purple-200"></div>
            <span className="text-sm text-purple-700 dark:text-purple-300">黄体期</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 dark:bg-red-900/20">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <span className="text-sm text-red-700 dark:text-red-300">排卵日</span>
          </div>
        </div>
      </div>

      {selectedDay && (
        <CycleInfoModal
          day={selectedDay}
          onClose={() => setSelectedDay(null)}
          cycleInfo={cycleInfo[selectedDay.phase]}
        />
      )}
    </>
  );
}