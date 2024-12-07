import React from 'react';
import { Moon, Home } from 'lucide-react';

interface HeaderProps {
  onHome?: () => void;
  showHomeButton?: boolean;
}

export function Header({ onHome, showHomeButton = false }: HeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <Moon className="w-10 h-10 text-indigo-500" />
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
          ルナシー
        </h1>
      </div>
      {showHomeButton && (
        <button
          onClick={onHome}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
        >
          <Home size={20} />
          <span>ホーム</span>
        </button>
      )}
    </div>
  );
}