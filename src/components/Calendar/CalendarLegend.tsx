import React from 'react';
import { CycleType } from '../../types';

const legendItems: { type: CycleType; label: string }[] = [
  { type: 'period', label: '生理期間' },
  { type: 'fertile', label: '排卵期' },
  { type: 'ovulation', label: '排卵日' },
];

export function CalendarLegend() {
  const getColorClass = (type: CycleType) => {
    switch (type) {
      case 'period':
        return 'bg-indigo-100 dark:bg-indigo-900/30';
      case 'fertile':
        return 'bg-purple-100 dark:bg-purple-900/30';
      case 'ovulation':
        return 'bg-violet-200 dark:bg-violet-900/30';
      default:
        return '';
    }
  };

  return (
    <div className="mt-4 flex gap-4 justify-end">
      {legendItems.map(({ type, label }) => (
        <div key={type} className="flex items-center gap-2">
          <div className={`w-4 h-4 rounded ${getColorClass(type)}`}></div>
          <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
        </div>
      ))}
    </div>
  );
}